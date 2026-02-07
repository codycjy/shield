import { Database } from "bun:sqlite";

// Initialize SQLite database
const db = new Database("mindshield.db");

// Create tables
db.run(`
  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS logs (
    id TEXT PRIMARY KEY,
    text TEXT NOT NULL,
    toxic INTEGER NOT NULL,
    score REAL NOT NULL,
    category TEXT NOT NULL,
    reason TEXT,
    action TEXT NOT NULL,
    platform TEXT NOT NULL,
    created_at TEXT NOT NULL,
    severity TEXT DEFAULT 'medium',
    is_exempted INTEGER DEFAULT 0,
    processing_path TEXT DEFAULT '',
    all_scores TEXT DEFAULT '{}',
    llm_analysis TEXT
  )
`);

// Migrate: add columns if upgrading from older schema
const addColumn = (col: string, type: string, defaultVal: string) => {
  try {
    db.run(`ALTER TABLE logs ADD COLUMN ${col} ${type} DEFAULT ${defaultVal}`);
  } catch {
    // column already exists — ignore
  }
};
addColumn("severity", "TEXT", "'medium'");
addColumn("is_exempted", "INTEGER", "0");
addColumn("processing_path", "TEXT", "''");
addColumn("all_scores", "TEXT", "'{}'");
addColumn("llm_analysis", "TEXT", "NULL");

db.run(`
  CREATE INDEX IF NOT EXISTS idx_logs_created_at ON logs(created_at DESC)
`);

db.run(`
  CREATE INDEX IF NOT EXISTS idx_logs_category ON logs(category)
`);

// Initialize default settings
const initSetting = db.prepare(`
  INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)
`);

initSetting.run("mode", "off");
initSetting.run("activated_at", "");

export { db };
