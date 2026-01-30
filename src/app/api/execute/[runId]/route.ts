import { NextRequest, NextResponse } from "next/server";
import { runs } from "@trigger.dev/sdk/v3";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, context: any) {
    try {
        const user = await getCurrentUser();
        const runId = context?.params?.runId || (await context?.params)?.runId;

        const run = await (prisma as any).workflowRun.findUnique({
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
          const triggerRun = await runs.retrieve(run.triggerId).catch(() => null);

          return NextResponse.json({
            status: triggerRun?.status ?? run.status,
            output: triggerRun?.output ?? run.output,
            error: triggerRun?.error ?? run.errorMessage,
            isCompleted: !!triggerRun?.isCompleted,
            isFailed: (triggerRun?.status === "FAILED" || triggerRun?.status === "CRASHED") || false,
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
