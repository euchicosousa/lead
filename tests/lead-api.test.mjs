import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createHmac } from "node:crypto";
import handler from "../api/lead.mjs";
let server, base;
const originalFetch = globalThis.fetch;
let rows = new Map();
before(async () => {
	process.env.LEADS_ORIGIN = "http://localhost:3000";
	process.env.SUPABASE_URL = "https://example.supabase.co";
	process.env.SUPABASE_SERVICE_ROLE_KEY = "private-test-key";
	process.env.LEAD_SESSION_SECRET =
		"test-secret-at-least-thirty-two-characters";
	globalThis.fetch = async (url, opts) => {
		const u = new URL(url);
		if (u.hostname !== "example.supabase.co") return originalFetch(url, opts);
		if (opts.method === "POST") {
			const id = crypto.randomUUID();
			rows.set(id, JSON.parse(opts.body));
			return Response.json([{ id }], { status: 201 });
		}
		const id = u.searchParams.get("id").slice(3);
		const row = rows.get(id);
		if (row) rows.set(id, { ...row, ...JSON.parse(opts.body) });
		return Response.json(row ? [{ id }] : []);
	};
	server = createServer(handler);
	await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
	base = "http://127.0.0.1:" + server.address().port;
});
after(async () => {
	globalThis.fetch = originalFetch;
	await new Promise((resolve) => server.close(resolve));
});
const send = (method, body, cookie, origin = "http://localhost:3000") =>
	originalFetch(base + "/api/lead", {
		method,
		headers: {
			Origin: origin,
			"Content-Type": "application/json",
			...(cookie ? { Cookie: cookie } : {}),
		},
		body: JSON.stringify(body),
	});
test("visitor can update only the lead authorized by its HttpOnly cookie", async () => {
	const a = await send("POST", { name: "Teste A", whatsapp: "85999999999" });
	assert.equal(a.status, 201);
	const id = (await a.json()).id,
		cookie = a.headers.get("set-cookie").split(";")[0];
	assert.match(a.headers.get("set-cookie"), /HttpOnly/);
	assert.equal((await send("PATCH", { id, completed: true })).status, 401);
	assert.equal(
		(await send("PATCH", { id, completed: true }, cookie)).status,
		200,
	);
	const b = await send("POST", { name: "Teste B", whatsapp: "85988888888" });
	const foreign = (await b.json()).id;
	assert.equal(
		(await send("PATCH", { id: foreign, completed: true }, cookie)).status,
		403,
	);
	assert.equal(rows.get(foreign).completed, false);
	assert.equal(
		(await send("PATCH", { id, completed: true }, cookie + "x")).status,
		401,
	);
});

test("refuses foreign Origin, unknown fields and oversized payloads", async () => {
	assert.equal(
		(
			await send(
				"POST",
				{ name: "Teste", whatsapp: "85999999999" },
				undefined,
				"https://foreign.example",
			)
		).status,
		403,
	);
	assert.equal(
		(
			await send("POST", {
				name: "Teste",
				whatsapp: "85999999999",
				admin: true,
			})
		).status,
		400,
	);
	assert.equal(
		(
			await send("POST", {
				name: "Teste",
				whatsapp: "85999999999",
				answers: [{ question: "Q", answer: "x".repeat(40000) }],
			})
		).status,
		413,
	);
	assert.equal(
		(await send("POST", { name: "Teste", whatsapp: "bad" })).status,
		400,
	);
	assert.equal((await originalFetch(base + "/api/lead")).status, 405);
});
test("missing server configuration fails closed", async () => {
	const original = process.env.LEAD_SESSION_SECRET;
	delete process.env.LEAD_SESSION_SECRET;
	try {
		assert.equal(
			(await send("POST", { name: "Teste", whatsapp: "85999999999" })).status,
			503,
		);
	} finally {
		process.env.LEAD_SESSION_SECRET = original;
	}
});
test("deleted lead is not falsely reported as saved", async () => {
	const created = await send("POST", {
		name: "Teste",
		whatsapp: "85999999999",
	});
	const id = (await created.json()).id,
		cookie = created.headers.get("set-cookie").split(";")[0];
	rows.delete(id);
	assert.equal(
		(await send("PATCH", { id, completed: true }, cookie)).status,
		404,
	);
});

test("expired cookie is rejected and HTTPS cookie carries Secure", async () => {
	const created = await send("POST", {
		name: "Teste",
		whatsapp: "85999999999",
	});
	const id = (await created.json()).id;
	const value = id + "." + (Math.floor(Date.now() / 1000) - 10);
	const signature = createHmac("sha256", process.env.LEAD_SESSION_SECRET)
		.update(value)
		.digest("base64url");
	assert.equal(
		(
			await send(
				"PATCH",
				{ id, completed: true },
				"lead_edit=" + value + "." + signature,
			)
		).status,
		401,
	);
	process.env.LEADS_ORIGIN = "https://leads.example";
	try {
		const secure = await send(
			"POST",
			{ name: "Teste", whatsapp: "85999999999" },
			undefined,
			"https://leads.example",
		);
		assert.equal(secure.status, 201);
		assert.match(secure.headers.get("set-cookie"), /; Secure/);
	} finally {
		process.env.LEADS_ORIGIN = "http://localhost:3000";
	}
});
