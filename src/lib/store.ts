import { create } from 'zustand';
import { temporal } from 'zundo';
import {
    Edge,
    Node,
    OnNodesChange,
    OnEdgesChange,
    OnConnect,
    applyNodeChanges,
    applyEdgeChanges,
    addEdge,
    Connection,
    getOutgoers,
} from '@xyflow/react';

interface FlowState {
    nodes: Node[];
    edges: Edge[];
    onNodesChange: OnNodesChange;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: Node[]) => void;
    setEdges: (edges: Edge[]) => void;
    addNode: (node: Node) => void;
}

// DAG (Cycle) Validation
export const isCyclic = (nodes: Node[], edges: Edge[], connection: Connection): boolean => {
    const target = nodes.find((n) => n.id === connection.target);
    const source = nodes.find((n) => n.id === connection.source);

    if (!target || !source) return false;

    // Check if source is reachable from target (which would form a cycle if we connect source -> target)
    // We want to add source -> target.
    // If we can already go Target -> ... -> Source, then adding Source -> Target creates a loop.

    // Perform a traversal starting from 'target'
    const stack = [target];
    const visited = new Set();

    while (stack.length > 0) {
        const current = stack.pop();
        if (!current) continue;

        if (visited.has(current.id)) continue;
        visited.add(current.id);

        if (current.id === source.id) return true; // Cycle detected

        const outgoers = getOutgoers(current, nodes, edges);
        stack.push(...outgoers);
    }

    return false;
};

// Type Validation
const isValidTypeConnection = (connection: Connection): boolean => {
    // In React Flow, we can verify handles if needed. 
    // In our case, we will assume strict port Types if we implement data-handle-type
    // But for now, let's just allow connections and rely on standard React Flow handle validation 
    // if we put type='source' and type='target'.

    // For more advanced type safety (Text -> Image = Block), we need to inspect the handle DOM or Node Data.
    // Since 'connection' doesn't give us the handle DOM node easily without more state, 
    // we often rely on handle naming conventions (e.g., 'text-source', 'image-target').

    // Let's defer strict type checking to `isValidConnection` prop in ReactFlow component using `getNodes`
    return true;
};

export const useFlowStore = create<FlowState>()(
    temporal(
        (set, get) => ({
            nodes: [],
            edges: [],
            onNodesChange: (changes) => {
                set({
                    nodes: applyNodeChanges(changes, get().nodes),
                });
            },
            onEdgesChange: (changes) => {
                set({
                    edges: applyEdgeChanges(changes, get().edges),
                });
            },
            onConnect: (connection) => {
                const { nodes, edges } = get();

                // 1. Cycle Prevention
                if (isCyclic(nodes, edges, connection)) {
                    console.warn("Cycle detected! Connection blocked.");
                    return; // Reject
                }

                set({
                    edges: addEdge(connection, edges),
                });
            },
            setNodes: (nodes) => set({ nodes }),
            setEdges: (edges) => set({ edges }),
            addNode: (node) => set({ nodes: [...get().nodes, node] }),
        }),
        {
            limit: 100, // Undo history depth
        }
    )
);
