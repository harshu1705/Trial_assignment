import { task } from "@trigger.dev/sdk/v3";
import { runWorkflow } from "@/lib/execution/engine";
import { Node, Edge } from "@xyflow/react";
import { prisma } from "@/lib/prisma";

export const workflowTask = task({
    id: "workflow-task",
    maxDuration: 600, // 10 minutes
    run: async (payload: { nodes: Node[]; edges: Edge[]; runId?: string; userId?: string }) => {
        console.log("🚀 Starting workflow execution...");
        console.log(`📊 Received ${payload.nodes.length} nodes and ${payload.edges.length} edges.`);

        // Track node status
        const nodeStatus: Record<string, 'idle' | 'running' | 'completed' | 'error'> = {};
        payload.nodes.forEach(node => {
            nodeStatus[node.id] = 'idle';
        });

        try {
            // Run the deterministic engine
            // Now runWorkflow returns context even on failure (it breaks loop internally)
            const context = await runWorkflow(payload.nodes, payload.edges, (nodeId, status) => {
                console.log(`[${nodeId}] ➡️ ${status}`);
                nodeStatus[nodeId] = status;
            });

            // Extract results
            const results = Object.fromEntries(context.nodeResults);

            // Check for any failed nodes
            const hasFailure = Array.from(context.nodeResults.values()).some((r: any) => r.status === 'failed');
            const hasSuccess = Array.from(context.nodeResults.values()).some((r: any) => r.status === 'success');

            // Determine Overall Workflow Status
            // If we have both success and failure -> 'partial' or 'failed' (Spec allows 'partial', let's use 'failed' but with data for now, or 'partial' if implemented)
            // CTO requested "Mark this run as PARTIAL, not FAILED" if at least one node succeeds.
            let runStatus = "success";
            if (hasFailure) {
                runStatus = hasSuccess ? "partial" : "failed";
            }

            // Extract LLM response (if handy)
            const llmNodeResult = Array.from(context.nodeResults.values()).find((r: any) => typeof r.output === 'string' && r.output.length > 0);

            console.log(`✅ Workflow execution finished with status: ${runStatus}`);

            const result = {
                success: !hasFailure,
                executionId: context.executionId,
                results: results, // ✅ Persist ALL results, including failed ones
                llmResponse: llmNodeResult ? { text: (llmNodeResult as any).output } : undefined,
                logs: context.logs,
                nodeStatus,
                nodesExecuted: context.logs.filter(l => l.message.includes('Executing')).length
            };

            // Persist Run History by updating the existing run (created by /api/execute)
            try {
                if (payload.runId) {
                    await (prisma as any).workflowRun.update({
                        where: { id: payload.runId },
                        data: {
                            status: runStatus,
                            output: result,
                            completedAt: new Date(),
                        },
                    });
                    console.log("✅ Run updated in DB");
                } else {
                    // Fallback: create a system run if no runId provided
                    await (prisma as any).workflowRun.create({
                        data: {
                            userId: payload.userId || 'system',
                            status: runStatus,
                            output: result,
                        },
                    });
                    console.log("✅ Run created in DB (fallback)");
                }
            } catch (dbError) {
                console.error("❌ Failed to persist run to DB:", dbError);
            }

            return result;

        } catch (error: any) {
            // This catch block should arguably be unreachable now if engine.ts catches everything,
            // but we keep it for unexpected runtime errors outside the engine loop.
            console.error("❌ Workflow CRITICAL failure:", error);

            const failedResult = {
                success: false,
                error: error.message || "Unknown error occurred",
                stack: error.stack,
                failedAt: new Date().toISOString(),
                nodeStatus,
                results: {} // Ensure results is at least empty object
            };

            try {
                if (payload.runId) {
                    await (prisma as any).workflowRun.update({
                        where: { id: payload.runId },
                        data: {
                            status: 'failed',
                            output: failedResult,
                            completedAt: new Date(),
                        },
                    });
                } else {
                    await (prisma as any).workflowRun.create({
                        data: {
                            userId: payload.userId || 'system',
                            status: 'failed',
                            output: failedResult,
                        },
                    });
                }
            } catch (dbError) { console.error(dbError); }

            return failedResult;
        }
    },
});
