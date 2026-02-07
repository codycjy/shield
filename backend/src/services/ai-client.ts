import type { AnalyzeResult, AIFilterResponse } from "../types";

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:5001";

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
  const response = await fetch(`${AI_SERVICE_URL}/filter`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, id: id || crypto.randomUUID() }),
  });

  if (!response.ok) {
    throw new Error(`AI service responded ${response.status}`);
  }

  const data = (await response.json()) as AIFilterResponse;
  return mapAIResponse(data);
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
