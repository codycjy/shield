import { Hono } from "hono";
import { demoStore } from "../services/store";

const logs = new Hono();

logs.get("/", (c) => {
  const page = Number(c.req.query("page") || 1);
  const pageSize = Number(c.req.query("pageSize") || 20);
  return c.json(demoStore.getLogs(page, pageSize));
});

logs.get("/stats", (c) => {
  return c.json(demoStore.getStats());
});

export default logs;
