export interface AnswerItem {
	question: string;
	answer: string;
}
export interface LeadPayload {
	name: string;
	whatsapp: string;
	main_need?: string;
	answers?: AnswerItem[];
	completed?: boolean;
}
async function request(
	method: "POST" | "PATCH",
	payload: object,
): Promise<string> {
	let response: Response;
	try {
		response = await fetch("/api/lead", {
			method,
			credentials: "same-origin",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		});
	} catch {
		throw new Error("Não foi possível conectar. Suas respostas foram mantidas; tente novamente.");
	}
	if (!response.ok)
		throw new Error(
			response.status === 400
				? "Confira o preenchimento: nome de até 200 caracteres e respostas de até 5.000 caracteres."
				: response.status === 401
					? "Sua sessão de preenchimento expirou. Reinicie o formulário."
					: "Não foi possível salvar. Suas respostas foram mantidas; tente continuar novamente.",
		);
	const data: unknown = await response.json();
	if (
		!data ||
		typeof data !== "object" ||
		!("id" in data) ||
		typeof data.id !== "string"
	) {
		throw new Error(
			"Não foi possível confirmar o salvamento. Tente novamente.",
		);
	}
	return data.id;
}
export function createLead(
	name: string,
	whatsapp: string,
	initial?: Pick<LeadPayload, "main_need" | "answers">,
): Promise<string> {
	return request("POST", { name, whatsapp, ...initial });
}
export async function updateLead(
	id: string,
	payload: Partial<LeadPayload>,
): Promise<void> {
	await request("PATCH", { id, ...payload });
}
