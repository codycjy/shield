import type { LogEntry, LogStats, ProtectionMode } from "../types";
import { db } from "./db";

// Prepared statements for better performance
const statements = {
  // Settings
  getSetting: db.prepare<{ value: string }, [string]>(
    "SELECT value FROM settings WHERE key = ?"
  ),
  setSetting: db.prepare(
    "UPDATE settings SET value = ?, updated_at = CURRENT_TIMESTAMP WHERE key = ?"
  ),

  // Logs
  insertLog: db.prepare(`
    INSERT INTO logs (id, text, toxic, score, category, reason, action, platform, created_at,
                      severity, is_exempted, processing_path, all_scores, llm_analysis)
    VALUES ($id, $text, $toxic, $score, $category, $reason, $action, $platform, $created_at,
            $severity, $is_exempted, $processing_path, $all_scores, $llm_analysis)
  `),
  getLogs: db.prepare<
    {
      id: string;
      text: string;
      toxic: number;
      score: number;
      category: string;
      reason: string | null;
      action: string;
      platform: string;
      created_at: string;
      severity: string | null;
      is_exempted: number;
      processing_path: string | null;
      all_scores: string | null;
      llm_analysis: string | null;
    },
    [number, number]
  >("SELECT * FROM logs ORDER BY created_at DESC LIMIT ? OFFSET ?"),
  getLogCount: db.prepare<{ count: number }, []>("SELECT COUNT(*) as count FROM logs"),
  getLast24hCount: db.prepare<{ count: number }, [string]>(
    "SELECT COUNT(*) as count FROM logs WHERE created_at > ?"
  ),
  getCategoryStats: db.prepare<{ category: string; count: number }, []>(
    "SELECT category, COUNT(*) as count FROM logs GROUP BY category"
  ),
};

class SQLiteStore {
  getMode() {
    const mode = statements.getSetting.get("mode")?.value as ProtectionMode || "off";
    const activatedAt = statements.getSetting.get("activated_at")?.value || null;
    const count = statements.getLogCount.get()?.count || 0;

    return {
      mode,
      activatedAt: activatedAt || null,
      interceptedCount: count,
    };
  }

  setMode(mode: ProtectionMode) {
    statements.setSetting.run(mode, "mode");
    const activatedAt = mode === "off" ? "" : new Date().toISOString();
    statements.setSetting.run(activatedAt, "activated_at");
  }

  addLog(entry: LogEntry) {
    statements.insertLog.run({
      $id: entry.id,
      $text: entry.text,
      $toxic: entry.result.toxic ? 1 : 0,
      $score: entry.result.score,
      $category: entry.result.category,
      $reason: entry.result.reason || null,
      $action: entry.action,
      $platform: entry.platform,
      $created_at: entry.createdAt,
      $severity: entry.result.severity || "medium",
      $is_exempted: entry.result.isExempted ? 1 : 0,
      $processing_path: entry.result.processingPath || "",
      $all_scores: entry.result.allScores
        ? JSON.stringify(entry.result.allScores)
        : "{}",
      $llm_analysis: entry.result.llmAnalysis
        ? JSON.stringify(entry.result.llmAnalysis)
        : null,
    });
  }

  getLogs(page = 1, pageSize = 20): { data: LogEntry[]; total: number } {
    const offset = (page - 1) * pageSize;
    const rows = statements.getLogs.all(pageSize, offset);
    const total = statements.getLogCount.get()?.count || 0;

    const data: LogEntry[] = rows.map((row) => ({
      id: row.id,
      text: row.text,
      result: {
        toxic: row.toxic === 1,
        score: row.score,
        category: row.category,
        reason: row.reason || "",
        severity: row.severity || "medium",
        isExempted: row.is_exempted === 1,
        processingPath: row.processing_path || "",
        allScores: row.all_scores ? JSON.parse(row.all_scores) : {},
        llmAnalysis: row.llm_analysis ? JSON.parse(row.llm_analysis) : null,
      },
      action: row.action as LogEntry["action"],
      platform: row.platform,
      createdAt: row.created_at,
    }));

    return { data, total };
  }

  getStats(): LogStats {
    const total = statements.getLogCount.get()?.count || 0;

    // Last 24 hours
    const yesterday = new Date(Date.now() - 86400000).toISOString();
    const last24h = statements.getLast24hCount.get(yesterday)?.count || 0;

    // By category
    const categoryRows = statements.getCategoryStats.all();
    const byCategory: Record<string, number> = {};
    for (const row of categoryRows) {
      byCategory[row.category] = row.count;
    }

    return { totalIntercepted: total, last24h, byCategory };
  }

  reset() {
    db.run("DELETE FROM logs");
    statements.setSetting.run("off", "mode");
    statements.setSetting.run("", "activated_at");
  }
}

export const demoStore = new SQLiteStore();
