import React from "react";
import { useFormFlow } from "../hooks/useFormFlow";
import { useTheme } from "../context/ThemeContext";
import { InitialBlock } from "./InitialBlock";
import { QuestionText } from "./QuestionText";
import { QuestionSingle } from "./QuestionSingle";
import { QuestionMulti } from "./QuestionMulti";
import { QuestionFinish } from "./QuestionFinish";

export const FormContainer: React.FC = () => {
  const {
    currentQuestion,
    currentId,
    answersMap,
    canGoBack,
    progressPercentage,
    handleInitialBlockComplete,
    handleNext,
    handleBack,
  } = useFormFlow();

  const { theme, toggleTheme } = useTheme();

  const currentAnswerObj = answersMap.get(currentQuestion.id);
  const currentRawValue = currentAnswerObj?.rawValue;

  const getThemeLabel = () => {
    if (theme === "system") return "SYSTEM";
    if (theme === "dark") return "DARK";
    return "LIGHT";
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between p-6 pt-10 font-sans transition-colors duration-200 selection:bg-foreground selection:text-background relative">
      {/* Barra de Progresso Superior Fixa (100% da largura no topo absoluto da janela) */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-subgrid z-50 overflow-hidden">
        <div
          className="h-full bg-foreground transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Container Principal */}
      <div className="w-full max-w-5xl mx-auto flex flex-col justify-between min-h-[calc(100vh-4rem)]">
        {/* Header com Metadados e Botão de Alternância de Tema */}
        <header className="w-full flex items-center justify-between border-b border-border-custom pb-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-medium tracking-tighter text-foreground">
              CNVT
            </span>
            <span className="font-mono text-xs text-secondary uppercase tracking-widest hidden sm:inline">
              [ Primeiro contato ]
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Botão de Alternar Tema (Light / Dark / System) */}
            <button
              onClick={toggleTheme}
              className="text-xs font-mono uppercase tracking-widest text-secondary hover:text-foreground px-3 py-2 transition-all cursor-pointer flex items-center gap-2 bg-background"
              title="Alternar modo de tema (Light / Dark / System)"
            >
              <span>{getThemeLabel()}</span>
            </button>

            {canGoBack && (
              <button
                onClick={handleBack}
                className="text-xs font-mono uppercase tracking-widest text-secondary hover:text-foreground border border-border-custom px-4 py-2 transition-all cursor-pointer bg-background"
              >
                ← VOLTAR
              </button>
            )}
          </div>
        </header>

        {/* Área Central de Conteúdo */}
        <main className="w-full my-auto flex flex-col items-start justify-center py-12">
          {currentId === "initial_block" ? (
            <InitialBlock onComplete={handleInitialBlockComplete} />
          ) : currentQuestion.type === "text" ||
            currentQuestion.type === "phone" ? (
            <QuestionText
              key={currentQuestion.id}
              question={currentQuestion}
              defaultValue={currentRawValue || ""}
              onNext={handleNext}
            />
          ) : currentQuestion.type === "single" ? (
            <QuestionSingle
              key={currentQuestion.id}
              question={currentQuestion}
              selectedValue={currentRawValue}
              onNext={handleNext}
            />
          ) : currentQuestion.type === "multi" ? (
            <QuestionMulti
              key={currentQuestion.id}
              question={currentQuestion}
              defaultSelected={currentRawValue || []}
              onNext={handleNext}
            />
          ) : currentQuestion.type === "finish" ? (
            <QuestionFinish
              key={currentQuestion.id}
              question={currentQuestion}
            />
          ) : null}
        </main>

        {/* Rodapé no Estilo Suíço de Metadados */}
        <footer className="w-full text-xs font-mono text-secondary flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-border-custom pt-6 gap-2">
          <div className="flex items-center gap-4">
            <span>CNVT® INTERNATIONAL TYPOGRAPHIC STYLE</span>
          </div>
          <div className="flex items-center gap-4">
            <span>MODE: {theme.toUpperCase()}</span>
          </div>
        </footer>
      </div>
    </div>
  );
};
