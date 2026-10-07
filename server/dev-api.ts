import type { Plugin } from "vite";
export function leadApi(): Plugin {
	return {
		name: "lead-local-api",
		configureServer(server) {
			server.middlewares.use("/api/lead", async (req, res, next) => {
				if (req.url?.split("?")[0] !== "/") return next();
				try {
					const module = await server.ssrLoadModule("/api/lead.mjs");
					await module.default(req, res);
				} catch {
					res.statusCode = 503;
					res.setHeader("Content-Type", "application/json");
					res.end(JSON.stringify({ code: "SERVICE_UNAVAILABLE" }));
				}
			});
		},
	};
}
