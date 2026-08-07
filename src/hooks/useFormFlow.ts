import { useState, useCallback, useMemo } from 'react'
import { formQuestions } from '../lib/perguntas'
import { createLead, updateLead, type AnswerItem } from '../lib/leads'

export function useFormFlow() {
  const [currentId, setCurrentId] = useState<string>('initial_block')
  const [history, setHistory] = useState<string[]>([])
  const [answersMap, setAnswersMap] = useState<Map<string, { question: string; answer: string; rawValue: any }>>(new Map())
  const [leadId, setLeadId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Cálculo da barra de progresso ponderada
  const progressPercentage = useMemo(() => {
    if (currentId === 'initial_block') {
      return 0
    }

    const currentQuestionObj = formQuestions.find((q) => q.id === currentId)
    if (currentQuestionObj?.type === 'finish') {
      return 100
    }

    // Bloco inicial (perguntas 1, 2, 3 concluídas) vale 35% do formulário
    const initialWeight = 35

    // O histórico conta quantos passos já foram dados após o initial_block
    const stepsAfterInitial = history.filter((id) => id !== 'initial_block').length

    // Pesos regressivos para os passos pós-bloco inicial: 18%, 14%, 10%, 6%, 4%, 2%...
    const stepWeights = [18, 14, 10, 6, 4, 2]
    let accumulatedStepWeight = 0

    for (let i = 0; i < stepsAfterInitial; i++) {
      accumulatedStepWeight += stepWeights[i] !== undefined ? stepWeights[i] : 1
    }

    const totalCalculated = initialWeight + accumulatedStepWeight
    return Math.min(totalCalculated, 95)
  }, [currentId, history])

  // Manipular a conclusão das 3 primeiras perguntas de uma vez
  const handleInitialBlockComplete = useCallback(
    async (data: { name: string; whatsapp: string; mainNeed: string; nextId: string }) => {
      if (isSubmitting) return
      setIsSubmitting(true)

      const mainNeedQuestion = formQuestions.find((q) => q.id === 'main_need')
      const mainNeedLabel = mainNeedQuestion?.options?.find((o: any) => o.value === data.mainNeed)?.label || data.mainNeed

      const newMap = new Map(answersMap)
      newMap.set('name', { question: 'Como podemos chamar você?', answer: data.name, rawValue: data.name })
      newMap.set('whatsapp', { question: 'Qual é o seu WhatsApp?', answer: data.whatsapp, rawValue: data.whatsapp })
      newMap.set('main_need', {
        question: 'O que você está procurando para sua empresa neste momento?',
        answer: mainNeedLabel,
        rawValue: data.mainNeed,
      })
      setAnswersMap(newMap)

      // Criar lead no Supabase imediatamente
      const createdId = await createLead(data.name, data.whatsapp)
      if (createdId) {
        setLeadId(createdId)

        // Atualizar com a resposta da main_need e answers inicial
        const formattedAnswers: AnswerItem[] = [
          {
            question: 'O que você está procurando para sua empresa neste momento?',
            answer: mainNeedLabel,
          },
        ]

        await updateLead(createdId, {
          main_need: data.mainNeed,
          answers: formattedAnswers,
        })
      }

      setIsSubmitting(false)
      setHistory((prev) => [...prev, 'initial_block'])
      setCurrentId(data.nextId)
    },
    [answersMap, isSubmitting]
  )

  const handleNext = useCallback(
    async (value: any, displayAnswer?: string, explicitNextId?: string) => {
      if (isSubmitting) return

      const questionObj = formQuestions.find((q) => q.id === currentId)
      if (!questionObj) return

      const answerText = displayAnswer !== undefined ? displayAnswer : Array.isArray(value) ? value.join(', ') : String(value)

      const newAnswersMap = new Map(answersMap)
      newAnswersMap.set(currentId, {
        question: questionObj.question || (questionObj as any).title || '',
        answer: answerText,
        rawValue: value,
      })
      setAnswersMap(newAnswersMap)

      if (leadId) {
        const formattedAnswers: AnswerItem[] = Array.from(newAnswersMap.entries())
          .filter(([qId]) => qId !== 'name' && qId !== 'whatsapp')
          .map(([, d]) => ({
            question: d.question,
            answer: d.answer,
          }))

        const nextIsFinish = explicitNextId === 'finish' || questionObj.next === 'finish'

        updateLead(leadId, {
          answers: formattedAnswers,
          ...(nextIsFinish ? { completed: true } : {}),
        })
      }

      let nextQuestionId = explicitNextId || questionObj.next

      if (nextQuestionId) {
        setHistory((prev) => [...prev, currentId])
        setCurrentId(nextQuestionId)
      }
    },
    [currentId, answersMap, leadId, isSubmitting]
  )

  const handleBack = useCallback(() => {
    if (history.length === 0) return
    const prevHistory = [...history]
    const lastId = prevHistory.pop()!
    setHistory(prevHistory)
    setCurrentId(lastId)
  }, [history])

  const currentQuestion = formQuestions.find((q) => q.id === currentId) || {
    id: currentId,
    type: currentId === 'initial_block' ? 'initial_block' : 'text',
    question: '',
  }

  return {
    currentQuestion,
    currentId,
    answersMap,
    history,
    leadId,
    progressPercentage,
    handleInitialBlockComplete,
    handleNext,
    handleBack,
    canGoBack: history.length > 0 && currentQuestion.type !== 'finish',
  }
}
