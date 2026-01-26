import { task } from "@trigger.dev/sdk/v3";

export const testTask = task({
    id: "test-task",
    // Set an optional maxDuration to prevent it from running indefinitely
    maxDuration: 300,
    run: async (payload: { message: string }) => {
        console.log("Hello from Trigger.dev!");
        console.log("Payload:", payload);

        return {
            message: `Received: ${payload.message}`,
            timestamp: new Date().toISOString(),
        };
    },
});
