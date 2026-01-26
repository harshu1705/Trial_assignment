import { getExecutionOrder } from './src/lib/execution/engine';
import { Node, Edge } from '@xyflow/react';

const mockNode = (id: string): Node => ({ id, position: { x: 0, y: 0 }, data: {} });
const mockEdge = (source: string, target: string): Edge => ({ id: `${source}-${target}`, source, target });

console.log("Running DAG Tests...\n");

try {
    // Test 1: Linear A -> B -> C
    console.log("Test 1: Linear (A -> B -> C)");
    const nodes1 = [mockNode('A'), mockNode('B'), mockNode('C')];
    const edges1 = [mockEdge('A', 'B'), mockEdge('B', 'C')];
    const order1 = getExecutionOrder(nodes1, edges1);
    console.log("Order:", order1);
    if (JSON.stringify(order1) !== JSON.stringify(['A', 'B', 'C'])) throw new Error("Linear failed");
    console.log("✅ Passed\n");

    // Test 2: Branching (A -> B, A -> C)
    console.log("Test 2: Branching (A -> B, A -> C)");
    const nodes2 = [mockNode('A'), mockNode('B'), mockNode('C')];
    const edges2 = [mockEdge('A', 'B'), mockEdge('A', 'C')];
    const order2 = getExecutionOrder(nodes2, edges2);
    console.log("Order:", order2);
    if (order2[0] !== 'A' || order2.length !== 3) throw new Error("Branching failed");
    console.log("✅ Passed\n");

    // Test 3: Cycle (A -> B -> A)
    console.log("Test 3: Cycle (A -> B -> A)");
    const nodes3 = [mockNode('A'), mockNode('B')];
    const edges3 = [mockEdge('A', 'B'), mockEdge('B', 'A')];
    try {
        getExecutionOrder(nodes3, edges3);
        console.log("❌ Failed (Should have thrown error)");
    } catch (e: any) {
        console.log("✅ Passed (Caught error: " + e.message + ")\n");
    }

} catch (e: any) {
    console.error("Test Suite Failed:", e);
    process.exit(1);
}
