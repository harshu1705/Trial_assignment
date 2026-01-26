import { NextRequest, NextResponse } from "next/server";
import { tasks } from "@trigger.dev/sdk/v3";
import type { workflowTask } from "@/trigger/workflow";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { nodes, edges } = body;

        // Validate payload
        if (!nodes || !Array.isArray(nodes)) {
            return NextResponse.json(
                { error: "Invalid payload: nodes must be an array" },
                { status: 400 }
            );
        }

        if (!edges || !Array.isArray(edges)) {
            return NextResponse.json(
                { error: "Invalid payload: edges must be an array" },
                { status: 400 }
            );
        }

        console.log(`Triggering workflow execution with ${nodes.length} nodes`);

        // Trigger the workflow task
        const handle = await tasks.trigger<typeof workflowTask>(
            "workflow-task",
            { nodes, edges }
        );

        return NextResponse.json({
            success: true,
            runId: handle.id,
        });

    } catch (error: any) {
        console.error("Failed to trigger workflow:", error);
        return NextResponse.json(
            { error: error.message || "Failed to trigger workflow" },
            { status: 500 }
        );
    }
}
