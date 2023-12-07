import { Hono } from "hono";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { handleUmami } from "./umami";

import type { Env } from "./env";

const app = new Hono<Env>();

app.use("*", secureHeaders());
app.use("*", cors({ origin: "*" }));

const idToKvKey = (id: string) => `link-v1:${id}`;

const makeRedirect = (to: string) =>
	new Response(`Redirecting to ${to}`, {
		status: 302,
		headers: {
			location: to,
			"content-type": "text/plain; charset=utf-8",
		},
	});

app.get("/", () => makeRedirect("https://ryanccn.dev/"));

app.get("/:id", async (c) => {
	const id = c.req.param("id");
	const to = await c.env.KV.get(idToKvKey(id));
	if (!to) return c.notFound();

	const { UMAMI_INSTANCE, UMAMI_WEBSITE_ID } = c.env;
	if (UMAMI_INSTANCE && UMAMI_WEBSITE_ID) {
		c.executionCtx.waitUntil(
			handleUmami({
				instance: UMAMI_INSTANCE,
				key: id,
				request: c.req.raw,
				siteId: UMAMI_WEBSITE_ID,
			})
		);
	}

	return makeRedirect(to);
});

app.put("/:id", async (c) => {
	if (!c.env.SECRET) return c.json({ error: "Secret not configured" }, 401);
	if (c.req.header("authorization") !== `Bearer ${c.env.SECRET}`) return c.json({ error: "Unauthorized" }, 401);

	let to: string | undefined;

	try {
		to = (await c.req.json()).to;
	} catch {
		return c.json({ error: "Bad request" }, 400);
	}

	if (typeof to !== "string") return c.json({ error: "Bad request" }, 400);

	const id = c.req.param("id");
	await c.env.KV.put(idToKvKey(id), to);
	return c.json({ ok: true }, 201);
});

app.delete("/:id", async (c) => {
	if (!c.env.SECRET) return c.json({ error: "Secret not configured" }, 401);
	if (c.req.header("authorization") !== `Bearer ${c.env.SECRET}`) return c.json({ error: "Unauthorized" }, 401);

	const id = c.req.param("id");
	await c.env.KV.delete(idToKvKey(id));
	return c.json({ ok: true }, 200);
});

export default app;
