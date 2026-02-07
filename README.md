# MindShield

AI-powered anti-cyberbullying protection for content creators on social media.

MindShield acts as a "cyberbullying insurance" — it monitors your social media interactions in the background, and when a harassment storm hits, it activates full AI-powered filtering to shield you from toxic content in real time.

> **This is an early-stage demo** and is under active development. Features, UI, and APIs will change frequently.

## How It Works

```
Daily Mode (low power)          Crisis Mode (full power)
       │                               │
  Background monitoring ──→ Anomaly detected ──→ AI filters all content
  Low-frequency scanning     Auto/manual trigger   Real-time toxic content masking
  Baseline analysis          Full Gemini analysis   Evidence logging & batch blocking
```

- **Daily Mode**: Lightweight scanning of comments/DMs, building baseline data
- **Crisis Mode**: When an attack surge is detected, the system goes full throttle — masking toxic content with blur overlays, logging evidence, and batch-blocking malicious accounts

## Project Structure

```
shield/
├── frontend/     → React + Vite + Tailwind dashboard & live simulator
├── backend/      → Hono + Bun API server (Gemini AI integration)
├── extension/    → Chrome extension (floating ball + popup)
└── ai/           → Python ML preprocessing module
```

## Quick Start

**Prerequisites**: [Bun](https://bun.sh), [Node.js](https://nodejs.org) 18+

```bash
# 1. Clone
git clone <repo-url> && cd shield

# 2. Backend
cd backend
bun install
# Set up your .env with GEMINI_API_KEY and SUPABASE_URL/KEY
bun run dev        # → http://localhost:3000

# 3. Frontend (in another terminal)
cd frontend
npm install
npm run dev        # → http://localhost:5174
```

Open the browser, click **Guest Mode** on the landing page to enter the live simulator — no login required.

## Live Simulator

The built-in simulator provides a mock Twitter/X feed with pre-loaded tweets (positive, toxic, sarcastic, multilingual). Click the floating shield orb to activate protection and watch toxic content get masked in real time by Gemini AI.

## Tech Stack

| Layer | Stack |
|-------|-------|
| Frontend | React 19, Vite 7, Tailwind CSS 4, Recharts |
| Backend | Bun, Hono, Google Gemini AI |
| Extension | Chrome Manifest V3, React |
| Database | Supabase (PostgreSQL) |

## License

MIT
