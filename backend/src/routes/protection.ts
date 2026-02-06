import { Hono } from "hono";
import { demoStore } from "../services/store";

const protection = new Hono();

protection.get("/status", (c) => {
  return c.json(demoStore.getMode());
});

protection.post("/activate", (c) => {
  demoStore.setMode("crisis");
  return c.json(demoStore.getMode());
});

protection.post("/deactivate", (c) => {
  demoStore.setMode("daily");
  return c.json(demoStore.getMode());
});

export default protection;
