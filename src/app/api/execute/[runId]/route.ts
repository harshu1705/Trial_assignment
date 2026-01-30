import { NextRequest, NextResponse } from "next/server";
import { runs } from "@trigger.dev/sdk/v3";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ runId: string }> }
) {
    try {
        const user = await getCurrentUser();
        const { runId } = await params;

        const run = await prisma.workflowRun.findUnique({
          where: { id: runId },
          include: {
            nodeResults: true,
            executionLogs: {
              orderBy: { timestamp: 'asc' },
            },
          },
        });

        if (!run) {
          return NextResponse.json(
            { success: false, error: 'Run not found' },
            { status: 404 }
          );
        }

        if (run.userId !== user.id) {
          return NextResponse.json(
            { success: false, error: 'Unauthorized' },
            { status: 403 }
          );
        }

        if (run.triggerId) {
          const triggerRun = await runs.retrieve(run.triggerId);
          
          return NextResponse.json({
            status: triggerRun.status,
            output: triggerRun.output,
            error: triggerRun.error,
            isCompleted: triggerRun.isCompleted,
            isFailed: triggerRun.status === "FAILED" || triggerRun.status === "CRASHED",
            nodeResults: run.nodeResults,
            executionLogs: run.executionLogs,
          });
        }

        return NextResponse.json({
          status: run.status,
          output: run.output,
          error: run.errorMessage,
          nodeResults: run.nodeResults,
          executionLogs: run.executionLogs,
        });

    } catch (error: any) {
        console.error("Failed to get run status:", error);
        return NextResponse.json(
            { error: error.message || "Failed to get run status" },
            { status: 500 }
        );
    }
}
