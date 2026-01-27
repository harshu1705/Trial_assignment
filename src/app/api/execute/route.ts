import { NextResponse } from "next/server";
import { tasks } from "@trigger.dev/sdk/v3";

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

        // Trigger background workflow using v3 SDK
        const run = await tasks.trigger("workflow-task", {
            nodes,
            edges,
        });

        return NextResponse.json({
            success: true,
            runId: run.id,
        });
    } catch (error) {
        console.error("Execution error:", error);

        return NextResponse.json(
            { error: "Execution failed" },
            { status: 500 }
        );
    }
}
