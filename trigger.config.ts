import { defineConfig } from "@trigger.dev/sdk/v3";

export default defineConfig({
    project: process.env.TRIGGER_PROJECT_ID || "proj_xmwuwovckgkydvpsnxcd",
    maxDuration: 300, // 5 minutes default
    dirs: ["./src/trigger"], // Explicitly specify trigger directory
    retries: {
        enabledInDev: true,
        default: {
            maxAttempts: 3,
            minTimeoutInMs: 1000,
            maxTimeoutInMs: 10000,
            factor: 2,
            randomize: true,
        },
    },
});
