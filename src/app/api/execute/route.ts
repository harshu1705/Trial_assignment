import { NextResponse } from "next/server";
import { tasks, runs } from "@trigger.dev/sdk/v3";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { nodes, edges } = body;

        if (!nodes || nodes.length === 0) {
            return NextResponse.json(
                { success: false, error: "No nodes to execute" },
                { status: 400 }
            );
        }

        const run = await tasks.trigger("workflow-task", {
            nodes,
            edges,
        });

        return NextResponse.json({
            success: true,
            runId: run.id,
        });
    } catch (error: any) {
        console.error("❌ API /execute error:", error);

        return NextResponse.json(
            {
                success: false,
                error: error?.message || "Execution failed",
            },
            { status: 500 }
        );
    }
}
