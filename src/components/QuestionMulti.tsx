import React, { useState } from 'react'

interface QuestionMultiProps {
  question: any
  defaultSelected?: string[]
  onNext: (value: string[], displayAnswer?: string, explicitNextId?: string) => void
}

export const QuestionMulti: React.FC<QuestionMultiProps> = ({ question, defaultSelected = [], onNext }) => {
  const [selected, setSelected] = useState<string[]>(defaultSelected)
  const [error, setError] = useState('')

  const toggleOption = (val: string) => {
    if (error) setError('')
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    )
  }

  const handleSubmit = () => {
    if (question.required !== false && selected.length === 0) {
      setError('Por favor, selecione ao menos uma opção para avançar.')
      return
    }
    setError('')
    const labels = selected
      .map((val) => question.options?.find((o: any) => o.value === val)?.label || val)
      .join(', ')
    onNext(selected, labels, question.next)
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-3 border-b border-border-custom pb-6">
        <span className="font-mono text-xs text-secondary uppercase tracking-widest">[ MÚLTIPLA ESCOLHA ]</span>
        <h2 className="text-3xl sm:text-5xl font-medium text-foreground tracking-tight leading-tight">
          {question.question}
        </h2>
      </div>

      <div className="flex flex-col divide-y">
        {question.options?.map((opt: any) => {
          const isSelected = selected.includes(opt.value)
          return (
            <button
              key={opt.value}
              onClick={() => toggleOption(opt.value)}
              className={`w-full text-left p-8 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isSelected
                  ? 'bg-foreground text-background'
                  : 'bg-transparent text-foreground hover:bg-subgrid'
              }`}
            >
              <div className="text-3xl truncate tracking-tight font-medium w-full">
                {opt.label}
              </div>

              <div className="font-mono text-xs uppercase tracking-widest shrink-0">
                {isSelected ? '[ ✸ SELECIONADO ]' : '[   ]'}
              </div>
            </button>
          )
        })}
      </div>

      {error && (
        <div className="font-mono text-xs bg-error/10 border border-error/30 p-4 flex items-center gap-3 text-error">
          <span className="text-sm">✸</span>
          <span>{error}</span>
        </div>
      )}

      <div className="pt-4">
        <button
          onClick={handleSubmit}
          className="bg-foreground text-background hover:opacity-90 font-medium font-mono text-xs uppercase tracking-widest px-10 py-5 transition-all cursor-pointer flex items-center gap-4"
        >
          <span>CONFIRMAR SELEÇÕES</span>
          <span>→</span>
        </button>
      </div>
    </div>
  )
}
