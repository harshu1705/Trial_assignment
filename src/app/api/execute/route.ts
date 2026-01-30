import { NextRequest, NextResponse } from "next/server";
import { tasks } from "@trigger.dev/sdk/v3";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const ExecuteSchema = z.object({
  nodes: z.array(z.any()),
  edges: z.array(z.any()),
  workflowId: z.string().optional(),
});

export async function POST(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        const body = await req.json();
        const { nodes, edges, workflowId } = ExecuteSchema.parse(body);

        if (!nodes || nodes.length === 0) {
            return NextResponse.json(
                { success: false, error: "No nodes to execute" },
                { status: 400 }
            );
        }

        const run = await prisma.workflowRun.create({
          data: {
            userId: user.id,
            workflowId: workflowId || undefined,
            status: 'QUEUED',
            input: { nodes, edges },
          },
        });

        const triggerRun = await tasks.trigger("workflow-task", {
            nodes,
            edges,
            runId: run.id,
            userId: user.id,
        });

        await prisma.workflowRun.update({
          where: { id: run.id },
          data: { triggerId: triggerRun.id },
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
