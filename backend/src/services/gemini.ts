import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AnalyzeResult } from "../types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_PROMPT = `You are a content toxicity analyzer for social media. Analyze the given text and return a JSON object with:
- toxic: boolean (true if harmful)
- score: number 0-1 (toxicity level, 0=clean, 1=extremely toxic)
- category: one of "clean", "harassment", "hate_speech", "threat", "sarcasm", "spam"
- reason: brief explanation in English

Only return valid JSON, no markdown fences.`;

export async function analyzeText(text: string): Promise<AnalyzeResult> {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  const result = await model.generateContent([
    { text: SYSTEM_PROMPT },
    { text: `Analyze this text:\n"${text}"` },
  ]);
  let raw = result.response.text().trim();
  // Strip markdown code fences if present (e.g. ```json ... ```)
  raw = raw.replace(/^```(?:json)?\s*\n?/i, "").replace(/\n?```\s*$/,"");
  console.log(`[Gemini] input: "${text.slice(0, 80)}" => ${raw}`);
  try {
    return JSON.parse(raw);
  } catch {
    console.error(`[Gemini] JSON parse failed for: ${raw}`);
    return { toxic: false, score: 0, category: "clean", reason: "Parse error" };
  }
}

export async function analyzeTexts(
  items: Array<{ id: string; text: string }>
): Promise<Array<{ id: string } & AnalyzeResult>> {
  const results = await Promise.all(
    items.map(async (item) => {
      const result = await analyzeText(item.text);
      return { id: item.id, ...result };
    })
  );
  return results;
}
