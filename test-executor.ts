import { runWorkflow } from './src/lib/execution/engine';
import { Node, Edge } from '@xyflow/react';

const mockNode = (id: string, type: string, data: any = {}): Node => ({
    id,
    type,
    position: { x: 0, y: 0 },
    data
});

const mockEdge = (source: string, target: string): Edge => ({
    id: `${source}-${target}`,
    source,
    target
});

console.log("Running Executor Tests...\n");

const runTest = async () => {
    try {
        // Test: Text -> Debug
        console.log("Test 1: Simple Flow (Text -> Debug)");
        const nodes = [
            mockNode('1', 'text', { value: "Hello Execution Engine" }),
            mockNode('2', 'debug')
        ];
        const edges = [mockEdge('1', '2')];

        const context = await runWorkflow(nodes, edges, (nodeId, status) => {
            console.log(`[Status] ${nodeId}: ${status}`);
        });

        console.log("\nExecution Complete.");
        console.log("Context Logs:", context.logs.length);

        // Check Text Node Result
        const textResult = context.nodeResults.get('1');
        console.log("Text Result:", textResult);
        if (textResult?.text !== "Hello Execution Engine") throw new Error("Text Node output mismatch");

        // Check Debug Node Result (Input passed through)
        const debugResult = context.nodeResults.get('2');
        console.log("Debug Result:", debugResult);
        // Debug node merged input from Text (text: "Hello...")
        if (debugResult?.text !== "Hello Execution Engine") throw new Error("Debug Node input/output mismatch");

        console.log("✅ Passed\n");

    } catch (e: any) {
        console.error("Executor Test Failed:", e);
        process.exit(1);
    }
};

runTest();
