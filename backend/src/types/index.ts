export interface AnalyzeRequest {
  text: string;
  platform?: "twitter" | "instagram";
  contentType?: "comment" | "dm";
}

export interface AnalyzeResult {
  toxic: boolean;
  score: number; // 0-1
  category: string; // e.g. "harassment", "hate_speech", "sarcasm", "clean"
  reason: string;
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
  action: "hidden" | "deleted" | "auto_reply";
  platform: string;
  createdAt: string;
}

export interface LogStats {
  totalIntercepted: number;
  last24h: number;
  byCategory: Record<string, number>;
}
