import { test, expect, describe, beforeAll } from "bun:test";
import { isAIServiceHealthy } from "../services/ai-client";

const BASE = "http://localhost:3000";
const HEADERS = {
  "Content-Type": "application/json",
  "X-Demo-Mode": "true",
};

let serverUp = false;
let aiAvailable = false;

beforeAll(async () => {
  try {
    const res = await fetch(`${BASE}/health`);
    serverUp = res.ok;
  } catch {
    serverUp = false;
  }
  aiAvailable = await isAIServiceHealthy();

  if (!serverUp) console.warn("⚠️  Backend not running, route tests skipped");
  if (!aiAvailable) console.warn("⚠️  AI service not available, results may use Gemini fallback");
});

describe("POST /api/analyze", () => {
  test("returns 400 without text", async () => {
    if (!serverUp) return;

    const res = await fetch(`${BASE}/api/analyze`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
  });

  test("returns 401 without X-Demo-Mode", async () => {
    if (!serverUp) return;

    const res = await fetch(`${BASE}/api/analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "hello" }),
    });
    expect(res.status).toBe(401);
  });

  test("analyzes toxic text and returns enhanced fields", async () => {
    if (!serverUp) return;

    const res = await fetch(`${BASE}/api/analyze`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ text: "去死吧垃圾" }),
    });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.toxic).toBe(true);
    expect(data.category).not.toBe("safe");
    expect(data.score).toBeGreaterThan(0);
    expect(data.reason).toBeDefined();

    // AI-enhanced fields should be present
    if (aiAvailable) {
      expect(data.severity).toBeDefined();
      expect(data.processingPath).toBeDefined();
      expect(data.allScores).toBeDefined();
    }
  });

  test("safe content is not flagged", async () => {
    if (!serverUp) return;

    const res = await fetch(`${BASE}/api/analyze`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ text: "今天天气真好" }),
    });
    const data = await res.json();
    expect(data.toxic).toBe(false);
    expect(data.category).toBe("safe");
  });

  test("fan exemption works for positive expressions", async () => {
    if (!serverUp || !aiAvailable) return;

    const res = await fetch(`${BASE}/api/analyze`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({ text: "太美了吧！羡慕死了" }),
    });
    const data = await res.json();
    expect(data.toxic).toBe(false);
    expect(data.category).toBe("safe");
  });
});

describe("POST /api/analyze/batch", () => {
  test("returns 400 without items", async () => {
    if (!serverUp) return;

    const res = await fetch(`${BASE}/api/analyze/batch`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({}),
    });
    expect(res.status).toBe(400);
  });

  test("batch analyzes multiple texts", async () => {
    if (!serverUp) return;

    const res = await fetch(`${BASE}/api/analyze/batch`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        items: [
          { id: "t1", text: "你好" },
          { id: "t2", text: "去死吧" },
          { id: "t3", text: "加我微信领红包" },
        ],
      }),
    });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data.results).toHaveLength(3);
    expect(data.results[0].id).toBe("t1");
    expect(data.results[0].toxic).toBe(false);
    expect(data.results[1].toxic).toBe(true);
    expect(data.results[2].toxic).toBe(true);
  });
});

describe("GET /api/logs", () => {
  test("returns logs with enhanced fields", async () => {
    if (!serverUp) return;

    const res = await fetch(`${BASE}/api/logs`, { headers: HEADERS });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty("data");
    expect(data).toHaveProperty("total");

    if (data.data.length > 0) {
      const log = data.data[0];
      expect(log).toHaveProperty("result");
      expect(log.result).toHaveProperty("severity");
      expect(log.result).toHaveProperty("allScores");
    }
  });

  test("returns stats", async () => {
    if (!serverUp) return;

    const res = await fetch(`${BASE}/api/logs/stats`, { headers: HEADERS });
    expect(res.status).toBe(200);

    const data = await res.json();
    expect(data).toHaveProperty("totalIntercepted");
    expect(data).toHaveProperty("byCategory");
  });
});
