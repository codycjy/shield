export interface AnalyzeRequest {
  text: string;
  platform?: "twitter" | "instagram";
  contentType?: "comment" | "dm";
}

export interface AnalyzeResult {
  toxic: boolean;
  score: number; // 0-1 confidence
  category: string;
  reason: string;
  // Enhanced fields from AI service
  severity?: string; // "low" | "medium" | "high" | "critical"
  action?: string; // "keep" | "delete" | "review"
  isExempted?: boolean;
  processingPath?: string;
  allScores?: Record<string, number>;
  detoxifyRaw?: Record<string, number> | null;
  similarCases?: Array<{
    text: string;
    category: string;
    similarity: number;
    notes: string;
  }> | null;
  llmAnalysis?: Record<string, any> | null;
}

// Raw response from Python AI service /filter endpoint
export interface AIFilterResponse {
  comment_id: string;
  original_text: string;
  category: string;
  confidence: number;
  action: string;
  reason: string;
  severity: string;
  is_exempted: boolean;
  processing_path: string;
  all_scores: Record<string, number>;
  detoxify_raw: Record<string, number> | null;
  similar_cases: Array<{
    text: string;
    category: string;
    similarity: number;
    notes: string;
  }> | null;
  llm_analysis: Record<string, any> | null;
}

export interface BatchAnalyzeRequest {
  items: Array<{ id: string; text: string }>;
  platform?: "twitter" | "instagram";
}

export interface BatchAnalyzeResult {
  results: Array<{ id: string } & AnalyzeResult>;
}

export type ProtectionMode = "off" | "daily" | "crisis";

export interface ProtectionStatus {
  mode: ProtectionMode;
  activatedAt: string | null;
  interceptedCount: number;
}

export interface LogEntry {
  id: string;
  text: string;
  result: AnalyzeResult;
  action: "hidden" | "deleted" | "review" | "auto_reply";
  platform: string;
  createdAt: string;
}

export interface LogStats {
  totalIntercepted: number;
  last24h: number;
  byCategory: Record<string, number>;
}
