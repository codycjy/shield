import { Hono } from "hono";
import { analyzeText, analyzeTexts } from "../services/gemini";
import { demoStore } from "../services/store";
import type { AnalyzeRequest, BatchAnalyzeRequest } from "../types";

const analyze = new Hono();

analyze.post("/", async (c) => {
  const body = await c.req.json<AnalyzeRequest>();
  if (!body.text) return c.json({ error: "text is required" }, 400);

  const result = await analyzeText(body.text);

  if (result.toxic) {
    demoStore.addLog({
      id: crypto.randomUUID(),
      text: body.text,
      result,
      action: "hidden",
      platform: body.platform || "twitter",
      createdAt: new Date().toISOString(),
    });
  }

  return c.json(result);
});

analyze.post("/batch", async (c) => {
  const body = await c.req.json<BatchAnalyzeRequest>();
  if (!body.items?.length) return c.json({ error: "items is required" }, 400);

  const results = await analyzeTexts(body.items);

  for (const r of results) {
    if (r.toxic) {
      const item = body.items.find((i) => i.id === r.id);
      demoStore.addLog({
        id: crypto.randomUUID(),
        text: item?.text || "",
        result: { toxic: r.toxic, score: r.score, category: r.category, reason: r.reason },
        action: "hidden",
        platform: body.platform || "twitter",
        createdAt: new Date().toISOString(),
      });
    }
  }

  return c.json({ results });
});

export default analyze;
