import { Hono } from "hono";

const auth = new Hono();

auth.post("/demo", (c) => {
  return c.json({
    token: "demo_guest_token",
    role: "guest",
    expiresAt: new Date(Date.now() + 7 * 86400000).toISOString(),
  });
});

export default auth;
