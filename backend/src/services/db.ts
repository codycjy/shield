import { Database } from "bun:sqlite";

// Initialize SQLite database
const db = new Database("zenshield.db");

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
    created_at TEXT NOT NULL
  )
`);

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
