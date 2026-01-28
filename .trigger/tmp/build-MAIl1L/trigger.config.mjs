import {
  defineConfig
} from "./chunk-NL3CHZZW.mjs";
import "./chunk-U76V5X4F.mjs";
import "./chunk-33IJXG33.mjs";
import "./chunk-IA2HBA2V.mjs";
import "./chunk-USHNXJ63.mjs";
import {
  init_esm
} from "./chunk-244PAGAH.mjs";

// trigger.config.ts
init_esm();
var trigger_config_default = defineConfig({
  project: process.env.TRIGGER_PROJECT_ID || "proj_xmwuwovckgkydvpsnxcd",
  // 5 minutes default
  maxDuration: 300,
  // Explicitly specify trigger directory
  dirs: ["./src/trigger"],
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1e3,
      maxTimeoutInMs: 1e4,
      factor: 2,
      randomize: true
    }
  },
  build: {}
});
var resolveEnvVars = void 0;
export {
  trigger_config_default as default,
  resolveEnvVars
};
//# sourceMappingURL=trigger.config.mjs.map
