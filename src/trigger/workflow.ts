import { task } from "@trigger.dev/sdk/v3";
import { runWorkflow } from "@/lib/execution/engine";
import { Node, Edge } from "@xyflow/react";
import { prisma } from "@/lib/prisma";

export const workflowTask = task({
    id: "workflow-task",
    maxDuration: 600, // 10 minutes
    run: async (payload: { nodes: Node[]; edges: Edge[] }) => {
        console.log("🚀 Starting workflow execution...");
        console.log(`📊 Received ${payload.nodes.length} nodes and ${payload.edges.length} edges.`);

        // Track node status
        const nodeStatus: Record<string, 'idle' | 'running' | 'completed' | 'error'> = {};
        payload.nodes.forEach(node => {
            nodeStatus[node.id] = 'idle';
        });

        try {
            // Run the deterministic engine
            const context = await runWorkflow(payload.nodes, payload.edges, (nodeId, status) => {
                console.log(`[${nodeId}] ➡️ ${status}`);
                nodeStatus[nodeId] = status;
            });

            // Extract LLM response for top-level visibility
            // We look for a node that has an 'output' string which is likely our LLM response
            const llmNodeResult = Array.from(context.nodeResults.values()).find((r: any) => typeof r.output === 'string' && r.output.length > 0);

            console.log("✅ Workflow execution complete.");

            const result = {
                success: true,
                executionId: context.executionId,
                results: Object.fromEntries(context.nodeResults),
                llmResponse: llmNodeResult ? { text: (llmNodeResult as any).output } : undefined,
                logs: context.logs,
                nodeStatus,
                nodesExecuted: context.logs.filter(l => l.message.includes('Executing')).length
            };

            // DAY 2: Persist Run History
            try {
                await prisma.workflowRun.create({
                    data: {
                        status: "success",
                        scope: "full",
                        payload: JSON.stringify(result), // Manual serialization
                    },
                });
                console.log("✅ Run saved to DB");
            } catch (dbError) {
                console.error("❌ Failed to save run to DB:", dbError);
            }

            // Return the serializable parts of the context
            return result;

        } catch (error: any) {
            console.error("❌ Workflow failed:", error);

            const failedResult = {
                success: false,
                error: error.message || "Unknown error occurred",
                stack: error.stack,
                failedAt: new Date().toISOString(),
                nodeStatus // Include partial status even on failure
            };

            // DAY 2: Persist Failed Run
            try {
                await prisma.workflowRun.create({
                    data: {
                        status: "failed",
                        scope: "full",
                        payload: JSON.stringify(failedResult),
                    },
                });
                console.log("✅ Failed run saved to DB");
            } catch (dbError) {
                console.error("❌ Failed to save run to DB:", dbError);
            }

            // Return structured error response
            return failedResult;
        }
    },
});
