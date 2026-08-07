import React, { useState } from "react";

interface QuestionSingleProps {
  question: any;
  selectedValue?: string;
  onNext: (
    value: string,
    displayAnswer?: string,
    explicitNextId?: string,
  ) => void;
}

export const QuestionSingle: React.FC<QuestionSingleProps> = ({
  question,
  selectedValue,
  onNext,
}) => {
  const [error, setError] = useState("");

  const handleSelect = (option: any) => {
    setError("");
    onNext(option.value, option.label, option.next);
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-3 border-b border-border-custom pb-6">
        <h2 className="text-3xl sm:text-5xl font-medium text-foreground tracking-tight leading-tight">
          {question.question}
        </h2>
      </div>

      <div className="flex flex-col divide-y">
        {question.options?.map((opt: any) => {
          const isSelected = selectedValue === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => handleSelect(opt)}
              className={`w-full text-left p-8 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isSelected
                  ? "bg-foreground text-background"
                  : "bg-transparent text-foreground hover:bg-subgrid"
              }`}
            >
              <div className="text-3xl truncate tracking-tight font-medium w-full">
                {opt.label}
              </div>
              {opt.description && (
                <div className="text-xs sm:text-right sm:text-sm opacity-70">
                  {opt.description}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {error && (
        <div className="font-mono text-xs bg-error/10 border border-error/30 p-4 flex items-center gap-3 text-error">
          <span className="text-sm">✸</span>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
