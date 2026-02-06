import type { Context, Next } from "hono";

export async function demoAuth(c: Context, next: Next) {
  // Skip auth for /api/auth routes
  if (c.req.path.startsWith("/api/auth")) return next();

  const isDemo = c.req.header("X-Demo-Mode") === "true";
  if (isDemo) {
    c.set("role", "guest");
    return next();
  }
  // TODO: real Supabase JWT verification for production
  // For now, reject non-demo requests
  return c.json({ error: "Authentication required" }, 401);
}
