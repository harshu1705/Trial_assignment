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
        console.log('📥 POST /api/execute - Starting workflow execution');

        // Get current user
        const user = await getCurrentUser();
        console.log('👤 User authenticated:', user.id);

        // Parse and validate request body
        const body = await req.json();
        const { nodes, edges, workflowId } = ExecuteSchema.parse(body);
        console.log(`📊 Workflow data: ${nodes.length} nodes, ${edges.length} edges`);

        if (!nodes || nodes.length === 0) {
            return NextResponse.json(
                { success: false, error: "No nodes to execute" },
                { status: 400 }
            );
        }

        // Create workflow run in database
        console.log('💾 Creating workflow run in database...');
        const run = await prisma.workflowRun.create({
            data: {
                userId: user.id,
                workflowId: workflowId || undefined,
                status: 'QUEUED',
                input: JSON.stringify({ nodes, edges }),
            },
        });
        console.log('✅ Workflow run created:', run.id);

        // Trigger the workflow task
        console.log('🚀 Triggering workflow task in Trigger.dev...');
        const triggerRun = await tasks.trigger("workflow-task", {
            nodes,
            edges,
            runId: run.id,
            userId: user.id,
        });
        console.log('✅ Trigger.dev task triggered:', triggerRun.id);

        // Update run with trigger ID
        await prisma.workflowRun.update({
            where: { id: run.id },
            data: { triggerId: triggerRun.id },
        });

        console.log('✅ POST /api/execute - Success!');
        return NextResponse.json({
            success: true,
            runId: run.id,
        });
    } catch (error: any) {
        console.error("❌ API /api/execute error:", error);

        // Provide specific error messages
        let errorMessage = error?.message || "Execution failed";
        let hint = "";

        if (error.code === 'P2002') {
            errorMessage = "Database constraint error";
            hint = "Check if duplicate entries exist";
        } else if (error.message?.includes('Prisma')) {
            errorMessage = "Database error";
            hint = "Check if DATABASE_URL is set and migrations are run";
        } else if (error.message?.includes('trigger')) {
            errorMessage = "Trigger.dev error";
            hint = "Make sure 'npx trigger.dev dev' is running";
        } else if (error.message?.includes('auth')) {
            errorMessage = "Authentication error";
            hint = "User session may have expired";
        }

        const fullError = hint ? `${errorMessage} - ${hint}` : errorMessage;

        return NextResponse.json(
            {
                success: false,
                error: fullError,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined,
            },
            { status: 500 }
        );
    }
}

