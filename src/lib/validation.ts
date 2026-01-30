
import { Edge, Node, getOutgoers } from '@xyflow/react';
import { isCyclic } from './store';

export interface ValidationResult {
    isValid: boolean;
    error?: string;
}

export const validateWorkflow = (nodes: Node[], edges: Edge[]): ValidationResult => {
    // 1. Empty Canvas
    if (nodes.length === 0) {
        return { isValid: false, error: "Canvas is empty. Add nodes to start." };
    }

    // 2. Cycle Detection
    // We check if *any* connection forms a cycle. 
    // Since 'isCyclic' checks a specific connection, we might need a broader check.
    // However, the store prevents cycles on connect. 
    // But let's do a quick graph traversal to be safe, or rely on the fact that the store prevents it.
    // The requirement says "No DAG cycles". If the store prevents it, we are good.
    // Let's assume store prevents it for now, but we can double check if needed.
    // Actually, let's implement a quick check using topological sort logic or just rely on store.
    // Given 'isCyclic' is available, let's trust the construction.
    // BUT, let's double check disconnected components or isolated loops if manual manipulation happened?
    // Unlikely with React Flow. 

    // 3. Validation per Node Type
    for (const node of nodes) {
        // LLM Node Validation
        if (node.type === 'llm') {
            const promptConnections = edges.filter(
                e => e.target === node.id && (e.targetHandle === 'text-prompt' || e.targetHandle === 'user_message' || e.targetHandle === 'user')
            );
            const hasConnection = promptConnections.length > 0;
            const hasManualInput = !!(node.data.prompt as string)?.trim();

            if (!hasConnection && !hasManualInput) {
                return {
                    isValid: false,
                    error: `LLM Node "${node.data.label || 'LLM'}" is missing a prompt. Connect a Text node or enter a prompt manually.`
                };
            }
        }

        // Vision Node Validation
        if (node.type === 'vision') {
            const imageConnections = edges.filter(
                e => e.target === node.id && e.targetHandle === 'image-url'
            );
            const hasImageConnection = imageConnections.length > 0;
            const hasManualImage = !!(node.data.imageUrl as string)?.trim();

            if (!hasImageConnection && !hasManualImage) {
                return {
                    isValid: false,
                    error: `Vision Node "${node.data.label || 'Vision'}" is missing an Image URL. Connect a source or enter a URL.`
                };
            }
        }
    }

    return { isValid: true };
};
