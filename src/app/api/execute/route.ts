import { NextResponse } from "next/server";
import { tasks, runs } from "@trigger.dev/sdk/v3";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { nodes, edges } = body;

        if (!nodes || nodes.length === 0) {
            return NextResponse.json(
                { error: "No nodes to execute" },
                { status: 400 }
            );
        }

        // Trigger background workflow
        const run = await tasks.trigger("workflow-task", {
            nodes,
            edges,
        });

        let completedRun = null;

        try {
            // Attempt Synchronous Wait (Best Effort)
            // If this fails (timeout or network), we swallow the error and let frontend poll
            let currentRun = await runs.retrieve(run.id);
            const startTime = Date.now();
            const timeout = 60000; // 60s timeout

            while (!["COMPLETED", "FAILED", "CANCELED", "TIMED_OUT", "CRASHED"].includes(currentRun.status)) {
                if (Date.now() - startTime > timeout) {
                    break;
                }
                await new Promise(resolve => setTimeout(resolve, 1000));
                currentRun = await runs.retrieve(run.id);
            }
            completedRun = currentRun;
        } catch (waitError) {
            console.warn("Synchronous wait failed, falling back to polling:", waitError);
            // Do not throw, just proceed to return runId
        }

        return NextResponse.json({
            success: true,
            runId: run.id,
            // If we have a completed result, return it. Otherwise return partial/queued status.
            output: completedRun?.output,
            status: completedRun?.status || "QUEUED",
            error: completedRun?.error,
        });

    } catch (error: any) {
        console.error("Execution error:", error);

        return NextResponse.json(
            { error: `Execution failed: ${error.message}` },
            { status: 500 }
        );
    }
}
