import React, { useState } from "react";
import { IMaskInput } from "react-imask";
import { formQuestions } from "../lib/perguntas";

interface InitialBlockProps {
  onComplete: (data: {
    name: string;
    whatsapp: string;
    mainNeed: string;
    nextId: string;
  }) => void;
}

export const InitialBlock: React.FC<InitialBlockProps> = ({ onComplete }) => {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [mainNeed, setMainNeed] = useState("");
  const [error, setError] = useState("");

  const mainNeedQuestion = formQuestions.find((q) => q.id === "main_need");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação estrita: Nome obrigatório
    if (!name.trim()) {
      setError("Por favor, preencha o seu nome para continuar.");
      return;
    }

    // Validação estrita: WhatsApp completo (mínimo de dígitos válidos)
    const digitsOnly = whatsapp.replace(/\D/g, "");
    if (!whatsapp.trim() || digitsOnly.length < 10) {
      setError(
        "Por favor, informe um WhatsApp válido com DDD (ex: (11) 99999-9999).",
      );
      return;
    }

    // Validação estrita: Seleção da necessidade principal obrigatória
    if (!mainNeed) {
      setError("Por favor, selecione uma das opções acima para continuar.");
      return;
    }

    setError("");
    const selectedOption = mainNeedQuestion?.options?.find(
      (o: any) => o.value === mainNeed,
    ) as { value: string; label: string; next?: string } | undefined;
    const nextId = selectedOption?.next || "social_need";

    onComplete({
      name,
      whatsapp,
      mainNeed,
      nextId,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-12">
      {/* Header do Bloco */}
      <div className="flex flex-col gap-2 border-b  pb-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-secondary uppercase tracking-widest">
            [ 01 ]
          </span>
          <span className="font-mono text-xs text-secondary uppercase tracking-widest">
            — Identificação & Diagnóstico
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl text-foreground tracking-tight leading-none font-medium">
          Informações Iniciais
        </h1>
      </div>

      {/* Grid Inputs (Nome e Whatsapp) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Campo Nome */}
        <div className="flex flex-col gap-3 group">
          <label
            htmlFor="name-input"
            className="font-mono text-xs text-secondary uppercase tracking-widest flex items-center justify-between"
          >
            <span>01 / Como podemos chamar você?</span>
          </label>
          <input
            id="name-input"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            placeholder="Digite seu nome"
            className="w-full bg-transparent border-b border-border-hover group-focus-within:border-foreground py-4 text-xl sm:text-2xl text-foreground placeholder:opacity-30 focus:outline-none transition-colors rounded-none font-sans"
            autoFocus
          />
        </div>

        {/* Campo WhatsApp */}
        <div className="flex flex-col gap-3 group">
          <label
            htmlFor="whatsapp-input"
            className="font-mono text-xs text-secondary uppercase tracking-widest flex items-center justify-between"
          >
            <span>02 / WhatsApp de Contato</span>
          </label>
          <IMaskInput
            id="whatsapp-input"
            mask="(00) 00000-0000"
            value={whatsapp}
            unmask={false}
            onAccept={(val: string) => {
              setWhatsapp(val);
              if (error) setError("");
            }}
            placeholder="(00) 00000-0000"
            className="w-full bg-transparent border-b border-border-hover group-focus-within:border-foreground py-4 text-xl sm:text-2xl text-foreground placeholder:opacity-30 focus:outline-none transition-colors rounded-none font-mono"
          />
        </div>
      </div>

      {/* Pergunta 3: Main Need */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between border-b border-border-custom pb-3">
          <span className="font-mono text-xs text-secondary uppercase tracking-widest">
            03 / O que você busca para sua empresa neste momento?
          </span>
        </div>

        {/* Tabela/Grid de Opções */}
        <div className="flex flex-col divide-y">
          {mainNeedQuestion?.options?.map((opt: any) => {
            const isSelected = mainNeed === opt.value;
            return (
              <button
                type="button"
                key={opt.value}
                onClick={() => {
                  setMainNeed(opt.value);
                  if (error) setError("");
                }}
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
                  <div
                    className={`text-xs  sm:text-right sm:text-sm  opacity-70`}
                  >
                    {opt.description}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {error && (
        <div className="font-mono text-xs bg-error/10 border border-error/30 p-4 flex items-center gap-3 text-error">
          <span className="text-sm">✸</span>
          <span>{error}</span>
        </div>
      )}

      {/* Botão de Avanço */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full ml-auto sm:w-auto bg-foreground text-background hover:opacity-90 font-mono text-xs uppercase tracking-widest px-10 py-5 transition-all cursor-pointer flex items-center justify-center gap-4 font-medium"
        >
          <span>AVANÇAR PARA PRÓXIMA ETAPA</span>
          <span>→</span>
        </button>
      </div>
    </form>
  );
};
