import type { AnalyzeResult, AIFilterResponse } from "../types";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:5000";
console.log(`[ai-client] AI_SERVICE_URL = ${AI_SERVICE_URL}`);

function mapAIResponse(res: AIFilterResponse): AnalyzeResult {
  return {
    toxic: res.action !== "keep",
    score: res.confidence,
    category: res.category,
    reason: res.reason,
    severity: res.severity,
    action: res.action,
    isExempted: res.is_exempted,
    processingPath: res.processing_path,
    allScores: res.all_scores,
    detoxifyRaw: res.detoxify_raw,
    similarCases: res.similar_cases,
    llmAnalysis: res.llm_analysis,
  };
}

export async function analyzeWithAI(
  text: string,
  id?: string
): Promise<AnalyzeResult> {
  const url = `${AI_SERVICE_URL}/filter`;
  const reqId = id || crypto.randomUUID();
  console.log(`[ai-client] analyzeWithAI: url=${url} id=${reqId} text="${text.slice(0, 50)}"`);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, id: reqId }),
    });

    console.log(`[ai-client] response status=${response.status}`);

    if (!response.ok) {
      const body = await response.text();
      console.error(`[ai-client] AI error response: ${body}`);
      throw new Error(`AI service responded ${response.status}: ${body}`);
    }

    const data = (await response.json()) as AIFilterResponse;
    console.log(`[ai-client] success: category=${data.category} action=${data.action}`);
    return mapAIResponse(data);
  } catch (e: any) {
    console.error(`[ai-client] analyzeWithAI failed: ${e?.message || e}`);
    throw e;
  }
}

export async function analyzeWithAIBatch(
  items: Array<{ id: string; text: string }>
): Promise<Array<{ id: string } & AnalyzeResult>> {
  // AI service has no batch endpoint yet — fan out individual calls
  const results = await Promise.all(
    items.map(async (item) => {
      const result = await analyzeWithAI(item.text, item.id);
      return { id: item.id, ...result };
    })
  );
  return results;
}

export async function isAIServiceHealthy(): Promise<boolean> {
  try {
    const res = await fetch(`${AI_SERVICE_URL}/filter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "test", id: "health_check" }),
      signal: AbortSignal.timeout(3000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
