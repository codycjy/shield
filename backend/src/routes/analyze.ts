import { Hono } from "hono";
import { analyzeWithAI, analyzeWithAIBatch } from "../services/ai-client";
import { analyzeText as analyzeWithGemini, analyzeTexts as analyzeWithGeminiBatch } from "../services/gemini";
import { demoStore } from "../services/store";
import type { AnalyzeRequest, AnalyzeResult, BatchAnalyzeRequest } from "../types";

async function analyze(text: string, id?: string): Promise<AnalyzeResult> {
  console.log(`[analyze] start: text="${text.slice(0, 50)}"`);
  try {
    const result = await analyzeWithAI(text, id);
    console.log(`[analyze] AI success: category=${result.category}`);
    return result;
  } catch (e: any) {
    console.warn(`[analyze] AI failed: ${e?.message}, falling back to Gemini`);
    try {
      const result = await analyzeWithGemini(text);
      console.log(`[analyze] Gemini success: category=${result.category}`);
      return result;
    } catch (e2: any) {
      console.error(`[analyze] Gemini also failed: ${e2?.message}`);
      throw e2;
    }
  }
}

async function analyzeBatch(
  items: Array<{ id: string; text: string }>
): Promise<Array<{ id: string } & AnalyzeResult>> {
  try {
    return await analyzeWithAIBatch(items);
  } catch (e) {
    console.warn(`[AI] batch unavailable, falling back to Gemini:`, e);
    return await analyzeWithGeminiBatch(items);
  }
}

function mapAction(result: AnalyzeResult): "hidden" | "deleted" | "review" {
  if (result.action === "delete") return "deleted";
  if (result.action === "review") return "review";
  return "hidden";
}

const analyzeRoute = new Hono();

analyzeRoute.post("/", async (c) => {
  const body = await c.req.json<AnalyzeRequest>();
  if (!body.text) return c.json({ error: "text is required" }, 400);

  try {
    const result = await analyze(body.text);

    if (result.toxic) {
      demoStore.addLog({
        id: crypto.randomUUID(),
        text: body.text,
        result,
        action: mapAction(result),
        platform: body.platform || "twitter",
        createdAt: new Date().toISOString(),
      });
    }

    return c.json(result);
  } catch (e) {
    console.error("[analyze] All backends failed:", e);
    return c.json({ error: "Analysis service unavailable", toxic: false, score: 0, category: "unknown", reason: "Service unavailable" }, 503);
  }
});

analyzeRoute.post("/batch", async (c) => {
  const body = await c.req.json<BatchAnalyzeRequest>();
  if (!body.items?.length) return c.json({ error: "items is required" }, 400);

  try {
    const results = await analyzeBatch(body.items);

    for (const r of results) {
      if (r.toxic) {
        const item = body.items.find((i) => i.id === r.id);
        demoStore.addLog({
          id: crypto.randomUUID(),
          text: item?.text || "",
          result: { toxic: r.toxic, score: r.score, category: r.category, reason: r.reason,
                    severity: r.severity, action: r.action, isExempted: r.isExempted,
                    processingPath: r.processingPath, allScores: r.allScores,
                    llmAnalysis: r.llmAnalysis },
          action: mapAction(r),
          platform: body.platform || "twitter",
          createdAt: new Date().toISOString(),
        });
      }
    }

    return c.json({ results });
  } catch (e) {
    console.error("[analyze/batch] All backends failed:", e);
    return c.json({ results: [], error: "Analysis service unavailable" }, 503);
  }
});

export default analyzeRoute;
