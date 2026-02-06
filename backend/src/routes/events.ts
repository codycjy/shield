import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { demoStore } from "../services/store";

const events = new Hono();

// SSE endpoint for real-time protection status & interception updates
events.get("/", (c) => {
  return streamSSE(c, async (stream) => {
    let lastCount = -1;
    let lastMode = "";

    while (true) {
      const status = demoStore.getMode();
      const stats = demoStore.getStats();

      // Only push when something changed
      if (status.interceptedCount !== lastCount || status.mode !== lastMode) {
        lastCount = status.interceptedCount;
        lastMode = status.mode;

        await stream.writeSSE({
          event: "status",
          data: JSON.stringify({
            mode: status.mode,
            activatedAt: status.activatedAt,
            interceptedCount: status.interceptedCount,
            stats,
          }),
        });
      }

      await stream.sleep(1000);
    }
  });
});

export default events;
