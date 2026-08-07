import React from 'react'

interface QuestionFinishProps {
  question: any
}

export const QuestionFinish: React.FC<QuestionFinishProps> = ({ question }) => {
  return (
    <div className="w-full flex flex-col gap-8 py-10 border-l-2 border-foreground pl-6 sm:pl-10">
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs text-secondary uppercase tracking-widest">[ ✸ CONCLUÍDO ]</span>
      </div>

      <h2 className="text-4xl sm:text-7xl font-medium text-foreground tracking-tight leading-none">
        {question.title || question.question || 'Obrigado.'}
      </h2>

      {question.message && (
        <p className="text-lg sm:text-2xl text-secondary leading-relaxed font-sans max-w-2xl font-light">
          {question.message}
        </p>
      )}

      <div className="pt-6 border-t border-border-custom flex items-center gap-4">
        <span className="font-mono text-xs text-secondary uppercase tracking-widest">
          Sua resposta foi registrada no sistema.
        </span>
      </div>
    </div>
  )
}
