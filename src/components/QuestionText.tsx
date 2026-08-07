import React, { useState } from 'react'
import { IMaskInput } from 'react-imask'

interface QuestionTextProps {
  question: any
  defaultValue?: string
  onNext: (value: string, displayAnswer?: string, explicitNextId?: string) => void
}

export const QuestionText: React.FC<QuestionTextProps> = ({ question, defaultValue = '', onNext }) => {
  const [value, setValue] = useState(defaultValue)
  const [error, setError] = useState('')
  const isPhone = question.type === 'phone'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (isPhone) {
      const digitsOnly = value.replace(/\D/g, '')
      if (question.required && (!value.trim() || digitsOnly.length < 10)) {
        setError('Por favor, informe um WhatsApp válido com DDD.')
        return
      }
    } else {
      if (question.required && !value.trim()) {
        setError('Esta pergunta é obrigatória. Preencha sua resposta para continuar.')
        return
      }
    }

    setError('')
    onNext(value)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-10">
      <div className="flex flex-col gap-3 border-b border-border-custom pb-6">
        <span className="font-mono text-xs text-secondary uppercase tracking-widest">[ PERGUNTA TEXTUAL ]</span>
        <h2 className="text-3xl sm:text-5xl font-medium text-foreground tracking-tight leading-tight">
          {question.question}
        </h2>
      </div>

      <div className="relative group">
        {isPhone ? (
          <IMaskInput
            mask="(00) 00000-0000"
            value={value}
            unmask={false}
            onAccept={(val: string) => {
              setValue(val)
              if (error) setError('')
            }}
            placeholder="(00) 00000-0000"
            className="w-full bg-transparent border-b border-border-hover group-focus-within:border-foreground py-4 text-2xl sm:text-4xl text-foreground placeholder:opacity-20 focus:outline-none transition-colors rounded-none font-mono tracking-tight"
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => {
              setValue(e.target.value)
              if (error) setError('')
            }}
            placeholder="Sua resposta aqui..."
            className="w-full bg-transparent border-b border-border-hover group-focus-within:border-foreground py-4 text-2xl sm:text-4xl text-foreground placeholder:opacity-20 focus:outline-none transition-colors rounded-none font-sans tracking-tight"
            autoFocus
          />
        )}
      </div>

      {error && (
        <div className="font-mono text-xs bg-error/10 border border-error/30 p-4 flex items-center gap-3 text-error">
          <span className="text-sm">✸</span>
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center gap-6 pt-4">
        <button
          type="submit"
          className="bg-foreground text-background hover:opacity-90 font-medium font-mono text-xs uppercase tracking-widest px-10 py-5 transition-all cursor-pointer flex items-center gap-4"
        >
          <span>CONFIRMAR & AVANÇAR</span>
          <span>→</span>
        </button>
        <span className="text-xs font-mono text-secondary hidden sm:inline">[ PRESSIONE ENTER ↵ ]</span>
      </div>
    </form>
  )
}
