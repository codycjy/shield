import { test, expect, describe, mock, beforeAll } from "bun:test";
import { analyzeWithAI, analyzeWithAIBatch, isAIServiceHealthy } from "../services/ai-client";

const AI_URL = process.env.AI_SERVICE_URL || "http://localhost:5000";

// Skip all tests if AI service is not running
let aiAvailable = false;

beforeAll(async () => {
  aiAvailable = await isAIServiceHealthy();
  if (!aiAvailable) {
    console.warn("⚠️  AI service not available, integration tests will be skipped");
  }
});

describe("AI Client - Integration", () => {
  test("analyzes toxic content correctly", async () => {
    if (!aiAvailable) return;

    const result = await analyzeWithAI("去死吧垃圾", "test-toxic");
    expect(result.toxic).toBe(true);
    expect(result.score).toBeGreaterThan(0.5);
    expect(result.category).not.toBe("safe");
    expect(result.action).toBe("delete");
    expect(result.severity).toBeDefined();
    expect(result.llmAnalysis).toBeDefined();
  });

  test("recognizes safe/exempt fan expressions", async () => {
    if (!aiAvailable) return;

    const result = await analyzeWithAI("太美了我恨你怎么这么好看", "test-safe");
    expect(result.toxic).toBe(false);
    expect(result.category).toBe("safe");
    expect(result.action).toBe("keep");
  });

  test("detects scam content", async () => {
    if (!aiAvailable) return;

    const result = await analyzeWithAI("加我微信领红包，投资比特币稳赚", "test-scam");
    expect(result.toxic).toBe(true);
    expect(result.category).toBe("scam_spam");
    expect(result.action).toBe("delete");
    expect(result.severity).toBe("high");
  });

  test("detects English threats", async () => {
    if (!aiAvailable) return;

    const result = await analyzeWithAI("kill yourself nobody likes you", "test-threat-en");
    expect(result.toxic).toBe(true);
    expect(result.score).toBeGreaterThan(0.5);
  });

  test("recognizes English positive slang", async () => {
    if (!aiAvailable) return;

    const result = await analyzeWithAI("OMG slay queen you look amazing", "test-slang-en");
    expect(result.toxic).toBe(false);
    expect(result.category).toBe("safe");
  });

  test("returns all expected fields", async () => {
    if (!aiAvailable) return;

    const result = await analyzeWithAI("测试内容", "test-fields");
    expect(result).toHaveProperty("toxic");
    expect(result).toHaveProperty("score");
    expect(result).toHaveProperty("category");
    expect(result).toHaveProperty("reason");
    expect(result).toHaveProperty("severity");
    expect(result).toHaveProperty("action");
    expect(result).toHaveProperty("processingPath");
    expect(result).toHaveProperty("allScores");
    expect(result).toHaveProperty("detoxifyRaw");
  });

  test("batch analysis works", async () => {
    if (!aiAvailable) return;

    const items = [
      { id: "b1", text: "你好世界" },
      { id: "b2", text: "去死吧" },
    ];
    const results = await analyzeWithAIBatch(items);
    expect(results).toHaveLength(2);
    expect(results[0].id).toBe("b1");
    expect(results[1].id).toBe("b2");
    expect(results[1].toxic).toBe(true);
  });
});

describe("AI Client - Error handling", () => {
  test("throws on unreachable service", async () => {
    // Temporarily point to a bad URL
    const origFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      throw new Error("Connection refused");
    };

    try {
      await expect(analyzeWithAI("test")).rejects.toThrow();
    } finally {
      globalThis.fetch = origFetch;
    }
  });

  test("health check returns false when service is down", async () => {
    const origFetch = globalThis.fetch;
    globalThis.fetch = async () => {
      throw new Error("Connection refused");
    };

    try {
      const healthy = await isAIServiceHealthy();
      expect(healthy).toBe(false);
    } finally {
      globalThis.fetch = origFetch;
    }
  });
});
