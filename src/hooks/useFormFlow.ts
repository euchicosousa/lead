import { useState, useCallback, useMemo, useRef } from 'react'
import { formQuestions } from '../lib/perguntas'
import { createLead, updateLead, type AnswerItem } from '../lib/leads'

export function useFormFlow() {
  const [currentId, setCurrentId] = useState<string>('initial_block')
  const [history, setHistory] = useState<string[]>([])
  const [answersMap, setAnswersMap] = useState<Map<string, { question: string; answer: string; rawValue: string | string[] }>>(new Map())
  const [leadId, setLeadId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [saveError, setSaveError] = useState<string | null>(null)
  const savingRef = useRef(false)

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
      if (savingRef.current) return
      savingRef.current = true
      setIsSubmitting(true)
      setSaveError(null)

      const mainNeedQuestion = formQuestions.find((q) => q.id === 'main_need')
      const mainNeedLabel = mainNeedQuestion?.options?.find((o) => o.value === data.mainNeed)?.label || data.mainNeed

      const newMap = new Map(answersMap)
      newMap.set('name', { question: 'Como podemos chamar você?', answer: data.name, rawValue: data.name })
      newMap.set('whatsapp', { question: 'Qual é o seu WhatsApp?', answer: data.whatsapp, rawValue: data.whatsapp })
      newMap.set('main_need', {
        question: 'O que você está procurando para sua empresa neste momento?',
        answer: mainNeedLabel,
        rawValue: data.mainNeed,
      })
      setAnswersMap(newMap)

      try {
        const initial = {
          main_need: data.mainNeed,
          answers: [{question: 'O que você está procurando para sua empresa neste momento?', answer: mainNeedLabel}],
        }
        if (leadId) await updateLead(leadId, {name: data.name, whatsapp: data.whatsapp, ...initial})
        else setLeadId(await createLead(data.name, data.whatsapp, initial))
        setHistory((prev) => [...prev, 'initial_block'])
        setCurrentId(data.nextId)
      } catch (error) {
        setSaveError(error instanceof Error ? error.message : 'Não foi possível salvar. Tente novamente.')
      } finally {
        savingRef.current = false
        setIsSubmitting(false)
      }
    },
    [answersMap, leadId]
  )

  const handleNext = useCallback(
    async (value: string | string[], displayAnswer?: string, explicitNextId?: string) => {
      if (savingRef.current) return

      const questionObj = formQuestions.find((q) => q.id === currentId)
      if (!questionObj) return

      const answerText = displayAnswer !== undefined ? displayAnswer : Array.isArray(value) ? value.join(', ') : String(value)

      const newAnswersMap = new Map(answersMap)
      newAnswersMap.set(currentId, {
        question: questionObj.question || '',
        answer: answerText,
        rawValue: value,
      })
      setAnswersMap(newAnswersMap)

      if (!leadId) {
        setSaveError('Reinicie o formulário para confirmar seus dados de contato.')
        return
      }
      const nextQuestionId = explicitNextId || questionObj.next
      if (!nextQuestionId) return
      savingRef.current = true
      setIsSubmitting(true)
      setSaveError(null)
      try {
        const formattedAnswers: AnswerItem[] = Array.from(newAnswersMap.entries())
          .filter(([id]) => id !== 'name' && id !== 'whatsapp')
          .map(([, data]) => ({question: data.question, answer: data.answer}))
        await updateLead(leadId, {
          answers: formattedAnswers,
          ...(nextQuestionId === 'finish' ? {completed: true} : {}),
        })
        setHistory((prev) => [...prev, currentId])
        setCurrentId(nextQuestionId)
      } catch (error) {
        setSaveError(error instanceof Error ? error.message : 'Não foi possível salvar. Tente novamente.')
      } finally {
        savingRef.current = false
        setIsSubmitting(false)
      }
    },
    [currentId, answersMap, leadId]
  )

  const handleBack = useCallback(() => {
    if (savingRef.current || history.length === 0) return
    const prevHistory = [...history]
    const lastId = prevHistory.pop()
    if (!lastId) return
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
    isSubmitting,
    saveError,
    progressPercentage,
    handleInitialBlockComplete,
    handleNext,
    handleBack,
    canGoBack: history.length > 0 && currentQuestion.type !== 'finish',
  }
}
