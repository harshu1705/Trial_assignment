import {
  task
} from "./chunk-NL3CHZZW.mjs";
import {
  __name,
  init_esm
} from "./chunk-244PAGAH.mjs";

// src/trigger/test-job.ts
init_esm();
var testTask = task({
  id: "test-task",
  // Set an optional maxDuration to prevent it from running indefinitely
  maxDuration: 300,
  run: /* @__PURE__ */ __name(async (payload) => {
    console.log("Hello from Trigger.dev!");
    console.log("Payload:", payload);
    return {
      message: `Received: ${payload.message}`,
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
  }, "run")
});

export {
  testTask
};
//# sourceMappingURL=chunk-CA665XQR.mjs.map
