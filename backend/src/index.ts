import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { demoAuth } from "./middleware/auth";
import authRoutes from "./routes/auth";
import analyzeRoutes from "./routes/analyze";
import protectionRoutes from "./routes/protection";
import logRoutes from "./routes/logs";
import eventRoutes from "./routes/events";
import generateRoutes from "./routes/generate";

const app = new Hono();

app.use("*", logger());
app.use("*", cors());

// Public routes
app.route("/api/auth", authRoutes);

// Protected routes (demo auth for now)
app.use("/api/*", demoAuth);
app.route("/api/analyze", analyzeRoutes);
app.route("/api/protection", protectionRoutes);
app.route("/api/logs", logRoutes);
app.route("/api/events", eventRoutes);
app.route("/api/generate", generateRoutes);

// Health check
app.get("/health", (c) => c.json({ status: "ok" }));

export default {
  port: Number(process.env.PORT || 3000),
  fetch: app.fetch,
};
