import { task } from "@trigger.dev/sdk/v3";
import { runWorkflow } from "@/lib/execution/engine";
import { Node, Edge } from "@xyflow/react";

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

            // Extract LLM response for top-level visibility (User Requirement)
            const llmResult = Array.from(context.nodeResults.values()).find((r: any) => r.llmResponse);

            console.log("✅ Workflow execution complete.");

            // Return the serializable parts of the context
            return {
                success: true,
                executionId: context.executionId,
                results: Object.fromEntries(context.nodeResults),
                llmResponse: llmResult ? (llmResult as any).llmResponse : undefined, // Bubble up for debug/UI checks
                logs: context.logs,
                nodeStatus, // Per-node status for UI
                nodesExecuted: context.logs.filter(l => l.message.includes('Executing')).length
            };

        } catch (error: any) {
            console.error("❌ Workflow failed:", error);

            // Return structured error response
            return {
                success: false,
                error: error.message || "Unknown error occurred",
                stack: error.stack,
                failedAt: new Date().toISOString(),
                nodeStatus // Include partial status even on failure
            };
        }
    },
});
