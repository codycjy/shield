import { Hono } from "hono";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:5000";

const generateRoute = new Hono();

generateRoute.post("/", async (c) => {
  const body = await c.req.json<{
    count?: number;
    mode?: "normal" | "attack";
    language?: "zh" | "en" | null;
  }>();

  try {
    const res = await fetch(`${AI_SERVICE_URL}/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        count: body.count || 1,
        mode: body.mode || "normal",
        language: body.language || null,
      }),
    });

    if (!res.ok) {
      throw new Error(`AI service responded ${res.status}`);
    }

    const data = await res.json();
    return c.json(data);
  } catch (e: any) {
    console.error(`[generate] AI service unavailable: ${e?.message || e}`);
    return c.json({ comments: [], error: "AI service unavailable" }, 503);
  }
});

export default generateRoute;
