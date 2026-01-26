import { task } from "@trigger.dev/sdk/v3";
import { runWorkflow } from "@/lib/execution/engine";
import { Node, Edge } from "@xyflow/react";

export const workflowTask = task({
    id: "workflow-task",
    maxDuration: 600, // 10 minutes
    run: async (payload: { nodes: Node[]; edges: Edge[] }) => {
        console.log("Starting workflow execution...");
        console.log(`Received ${payload.nodes.length} nodes and ${payload.edges.length} edges.`);

        try {
            // Run the deterministic engine
            // In this phase, we are running the whole graph in one task.
            // In future phases, we might split nodes into sub-tasks.
            const context = await runWorkflow(payload.nodes, payload.edges, (nodeId, status) => {
                console.log(`[${nodeId}] status: ${status}`);
            });

            console.log("Workflow execution complete.");

            // Return the serializable parts of the context
            return {
                success: true,
                executionId: context.executionId,
                results: Object.fromEntries(context.nodeResults),
                logs: context.logs
            };

        } catch (error: any) {
            console.error("Workflow failed:", error);
            throw error;
        }
    },
});
