import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "lead_edit";
const TTL = 24 * 60 * 60;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
class PublicError extends Error {
	constructor(status, code) {
		super(code);
		this.status = status;
	}
}
const fail = (status, code) => {
	throw new PublicError(status, code);
};
const object = (value) =>
	value !== null && typeof value === "object" && !Array.isArray(value);
function payload(value, creating) {
	if (!object(value)) fail(400, "INVALID_INPUT");
	const allowed = [
		"id",
		"name",
		"whatsapp",
		"main_need",
		"answers",
		"completed",
	];
	if (Object.keys(value).some((key) => !allowed.includes(key)))
		fail(400, "INVALID_INPUT");
	if (creating && ("id" in value || value.completed === true))
		fail(400, "INVALID_INPUT");
	const result = {};
	for (const [key, max] of [
		["name", 200],
		["whatsapp", 40],
		["main_need", 100],
	]) {
		if (key in value) {
			if (
				typeof value[key] !== "string" ||
				!value[key].trim() ||
				value[key].length > max
			)
				fail(400, "INVALID_INPUT");
			result[key] = value[key].trim();
		}
	}
	if (creating && (!result.name || !result.whatsapp))
		fail(400, "INVALID_INPUT");
	if (result.whatsapp && !/^[0-9 ()+.-]+$/.test(result.whatsapp))
		fail(400, "INVALID_INPUT");
	if (
		result.whatsapp &&
		!/^\d{10,15}$/.test(result.whatsapp.replace(/\D/g, ""))
	)
		fail(400, "INVALID_INPUT");
	if ("completed" in value) {
		if (typeof value.completed !== "boolean") fail(400, "INVALID_INPUT");
		result.completed = value.completed;
	}
	if ("answers" in value) {
		if (!Array.isArray(value.answers) || value.answers.length > 50)
			fail(400, "INVALID_INPUT");
		result.answers = value.answers.map((item) => {
			if (
				!object(item) ||
				Object.keys(item).some((k) => !["question", "answer"].includes(k)) ||
				typeof item.question !== "string" ||
				!item.question.trim() ||
				item.question.length > 500 ||
				typeof item.answer !== "string" ||
				item.answer.length > 5000
			)
				fail(400, "INVALID_INPUT");
			return { question: item.question, answer: item.answer };
		});
	}
	if (
		!creating &&
		(typeof value.id !== "string" ||
			!UUID.test(value.id) ||
			!Object.keys(result).length)
	)
		fail(400, "INVALID_INPUT");
	return result;
}
function sign(value, secret) {
	return createHmac("sha256", secret).update(value).digest("base64url");
}
function authorize(req, id, secret) {
	const cookies = (req.headers.cookie || "").split(";").map((x) => x.trim());
	const token = cookies
		.find((x) => x.startsWith(COOKIE + "="))
		?.slice(COOKIE.length + 1);
	if (!token || token.length > 300) fail(401, "SESSION_REQUIRED");
	const [leadId, expires, signature, ...extra] = token.split(".");
	if (
		extra.length ||
		!UUID.test(leadId || "") ||
		!/^\d{10}$/.test(expires || "") ||
		!signature
	)
		fail(401, "SESSION_REQUIRED");
	const expected = Buffer.from(sign(leadId + "." + expires, secret));
	const actual = Buffer.from(signature);
	if (
		expected.length !== actual.length ||
		!timingSafeEqual(expected, actual) ||
		Number(expires) <= Date.now() / 1000
	)
		fail(401, "SESSION_REQUIRED");
	if (leadId !== id) fail(403, "LEAD_FORBIDDEN");
}
async function readBody(req) {
	if (req.body !== undefined) {
		if (Buffer.byteLength(JSON.stringify(req.body) || "") > 32768)
			fail(413, "INPUT_TOO_LARGE");
		if (typeof req.body === "string") {
			try {
				return JSON.parse(req.body);
			} catch {
				fail(400, "INVALID_INPUT");
			}
		}
		return req.body;
	}
	let size = 0;
	const chunks = [];
	for await (const chunk of req) {
		size += Buffer.byteLength(chunk);
		if (size > 32768) fail(413, "INPUT_TOO_LARGE");
		chunks.push(Buffer.from(chunk));
	}
	try {
		return JSON.parse(Buffer.concat(chunks).toString("utf8"));
	} catch {
		fail(400, "INVALID_INPUT");
	}
}
export default async function handler(req, res) {
	res.setHeader("Cache-Control", "no-store");
	res.setHeader("Content-Type", "application/json; charset=utf-8");
	res.setHeader("X-Content-Type-Options", "nosniff");
	const reply = (status, body) => {
		res.statusCode = status;
		res.end(JSON.stringify(body));
	};
	try {
		if (!["POST", "PATCH"].includes(req.method)) {
			res.setHeader("Allow", "POST, PATCH");
			return reply(405, { code: "METHOD_NOT_ALLOWED" });
		}
		const origin = process.env.LEADS_ORIGIN,
			secret = process.env.LEAD_SESSION_SECRET;
		const url = process.env.SUPABASE_URL,
			key = process.env.SUPABASE_SERVICE_ROLE_KEY;
		if (!origin || !secret || secret.length < 32 || !url || !key)
			fail(503, "SERVICE_UNAVAILABLE");
		const configured = new URL(origin);
		if (
			configured.origin !== origin ||
			!["http:", "https:"].includes(configured.protocol)
		)
			fail(503, "SERVICE_UNAVAILABLE");
		if (req.headers.origin !== origin) fail(403, "ORIGIN_FORBIDDEN");
		if (!req.headers["content-type"]?.startsWith("application/json"))
			fail(415, "JSON_REQUIRED");
		const input = await readBody(req),
			creating = req.method === "POST";
		const data = payload(input, creating);
		if (!creating) authorize(req, input.id, secret);
		const endpoint = new URL("/rest/v1/leads", url);
		endpoint.searchParams.set("select", "id");
		if (!creating) endpoint.searchParams.set("id", "eq." + input.id);
		const response = await fetch(endpoint, {
			method: creating ? "POST" : "PATCH",
			headers: {
				apikey: key,
				Authorization: "Bearer " + key,
				"Content-Type": "application/json",
				Prefer: "return=representation",
			},
			body: JSON.stringify(
				creating
					? { ...data, answers: data.answers || [], completed: false }
					: data,
			),
			signal: AbortSignal.timeout(15000),
		});
		if (!response.ok) fail(503, "SERVICE_UNAVAILABLE");
		const rows = await response.json();
		if (!Array.isArray(rows) || !rows.length) fail(404, "LEAD_NOT_FOUND");
		const id = rows[0]?.id;
		if (typeof id !== "string" || !UUID.test(id))
			fail(503, "SERVICE_UNAVAILABLE");
		if (creating) {
			const value = id + "." + (Math.floor(Date.now() / 1000) + TTL);
			res.setHeader(
				"Set-Cookie",
				COOKIE +
					"=" +
					value +
					"." +
					sign(value, secret) +
					"; Path=/api/lead; HttpOnly; SameSite=Strict; Max-Age=" +
					TTL +
					(configured.protocol === "https:" ? "; Secure" : ""),
			);
		}
		reply(creating ? 201 : 200, { id });
	} catch (error) {
		reply(error instanceof PublicError ? error.status : 503, {
			code:
				error instanceof PublicError ? error.message : "SERVICE_UNAVAILABLE",
		});
	}
}
