import { NextRequest, NextResponse } from "next/server";
import { runs } from "@trigger.dev/sdk/v3";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ runId: string }> }
) {
    try {
        // Await params in Next.js 15+
        const { runId } = await params;

        // Retrieve run status from Trigger.dev
        const run = await runs.retrieve(runId);

        return NextResponse.json({
            status: run.status,
            output: run.output,
            error: run.error,
            isCompleted: run.isCompleted,
            isFailed: run.status === "FAILED" || run.status === "CRASHED",
        });

    } catch (error: any) {
        console.error("Failed to get run status:", error);
        return NextResponse.json(
            { error: error.message || "Failed to get run status" },
            { status: 500 }
        );
    }
}
