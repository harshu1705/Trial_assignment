import { Edge, Node } from "@xyflow/react";
import { ExecutableNode, ExecutionContext, ExecutionLog } from "./types";
import { executorRegistry } from "./ExecutorRegistry";

/**
 * Determines the execution execution order of nodes based on the graph topology.
 * Uses Kahn's algorithm for Topological Sort.
 * 
 * @param nodes - All nodes in the flow
 * @param edges - All edges in the flow
 * @returns Array of Node IDs in execution order
 * @throws Error if a cycle is detected
 */
export const getExecutionOrder = (nodes: Node[], edges: Edge[]): string[] => {
    // 1. Initialize data structures
    const inDegree = new Map<string, number>();
    const adjList = new Map<string, string[]>();

    // Initialize in-degrees to 0 for all nodes
    nodes.forEach(node => {
        inDegree.set(node.id, 0);
        adjList.set(node.id, []);
    });

    // 2. Build Adjacency List and In-Degree Map
    edges.forEach(edge => {
        const source = edge.source;
        const target = edge.target;

        // If edge connects to nodes not in our list (e.g. deleted), skip
        if (!inDegree.has(source) || !inDegree.has(target)) return;

        // Add to adjacency list (Source -> [Targets])
        adjList.get(source)?.push(target);

        // Increment in-degree of target
        inDegree.set(target, (inDegree.get(target) || 0) + 1);
    });

    // 3. Queue nodes with in-degree 0 (no dependencies)
    const queue: string[] = [];
    inDegree.forEach((degree, id) => {
        if (degree === 0) {
            queue.push(id);
        }
    });

    const executionOrder: string[] = [];

    // 4. Process Queue
    while (queue.length > 0) {
        const currentId = queue.shift()!;
        executionOrder.push(currentId);

        const neighbors = adjList.get(currentId) || [];
        for (const neighbor of neighbors) {
            inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);

            if (inDegree.get(neighbor) === 0) {
                queue.push(neighbor);
            }
        }
    }

    // 5. Check for Cycles
    if (executionOrder.length !== nodes.length) {
        throw new Error("Cycle detected in workflow: Execution flow contains circular dependencies.");
    }

    return executionOrder;
};

/**
 * Standalone executor for LLM nodes to guarantee output format.
 * Uses native fetch for Groq (Llama 3) to strictly avoid dependency issues.
 */
export async function executeLLMNode({ prompt }: { prompt: string }) {
    if (!process.env.GROQ_API_KEY) {
        console.error("❌ GROQ_API_KEY is missing");
        throw new Error("GROQ_API_KEY is not set");
    }

    console.log(`🚀 Sending prompt to Groq (Llama 3) via fetch: "${prompt.substring(0, 50)}..."`);

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "llama3-8b-8192",
                messages: [{ role: "user", content: prompt }]
            })
        });

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`Groq API Error: ${response.status} - ${errorBody}`);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || "No response";

        console.log("✅ Groq response received length:", text.length);
        return text;

    } catch (error: any) {
        console.error("❌ Groq API execution error:", error);
        throw error;
    }
}

/**
 * Orchestrates the execution of the workflow.
 */
export const runWorkflow = async (
    nodes: Node[],
    edges: Edge[],
    onStatusChange?: (nodeId: string, status: 'running' | 'completed' | 'error') => void
): Promise<ExecutionContext> => {

    // 1. Get execution order
    const executionOrder = getExecutionOrder(nodes, edges);

    // 2. Initialize Context
    const context: ExecutionContext = {
        executionId: crypto.randomUUID(),
        nodeResults: new Map(),
        logs: [],
        log: (nodeId: string, message: string) => {
            console.log(`[${nodeId}] ${message}`);
            context.logs.push({
                nodeId,
                message,
                timestamp: Date.now()
            });
        }
    };

    // 3. Execute Nodes in Order
    for (const nodeId of executionOrder) {
        const node = nodes.find(n => n.id === nodeId);
        if (!node) continue;

        console.log("🔥 EXECUTING NODE", node.id, node.type);

        const nodeType = node.type || "unknown";

        // Guaranteed LLM Execution Path (Robust Fuzzy Match)
        if (nodeType.toLowerCase().includes("llm") || nodeType.toLowerCase().includes("ai")) {
            try {
                if (onStatusChange) onStatusChange(nodeId, 'running');

                // Collect inputs from upstream nodes
                const inputEdges = edges.filter(e => e.target === nodeId);
                const inputs: Record<string, unknown> = { ...node.data };

                for (const edge of inputEdges) {
                    const sourceResult = context.nodeResults.get(edge.source);
                    if (sourceResult) {
                        Object.assign(inputs, sourceResult);
                    }
                }

                const prompt = (inputs.text as string) || (inputs.prompt as string) || (inputs.value as string) || "";

                if (!prompt) {
                    throw new Error("LLM node received empty prompt");
                }

                context.log(nodeId, `Executing LLM Node with prompt: "${prompt.substring(0, 50)}..."`);

                const geminiText = await executeLLMNode({
                    prompt: prompt,
                });

                context.log(nodeId, `Generated ${geminiText.length} characters`);

                context.nodeResults.set(nodeId, {
                    llmResponse: {
                        text: geminiText,
                    },
                });

                if (onStatusChange) onStatusChange(nodeId, 'completed');
                continue; // Skip generic executor

            } catch (error: any) {
                context.log(nodeId, `Error in LLM execution: ${error.message}`);
                console.error(`[${nodeId}] Full Error Stack:`, error);
                if (onStatusChange) onStatusChange(nodeId, 'error');
                // We rethrow so the workflow engine knows it failed
                throw error;
            }
        }

        const ExecutorClass = executorRegistry[nodeType];

        if (!ExecutorClass) {
            context.log(nodeId, `No executor found for type: ${nodeType}`);
            continue;
        }

        try {
            if (onStatusChange) onStatusChange(nodeId, 'running');

            const executor = new ExecutorClass();

            // Collect inputs from upstream nodes
            // Find edges where target is this node
            const inputEdges = edges.filter(e => e.target === nodeId);
            const inputs: Record<string, unknown> = { ...node.data };

            for (const edge of inputEdges) {
                const sourceResult = context.nodeResults.get(edge.source);
                if (sourceResult) {
                    // Start simple: merge all upstream results
                    // In real engine, we'd map handles
                    Object.assign(inputs, sourceResult);
                }
            }

            const output = await executor.execute(inputs, context);
            context.nodeResults.set(nodeId, output);

            if (onStatusChange) onStatusChange(nodeId, 'completed');

        } catch (error: any) {
            context.log(nodeId, `Error executing node: ${error.message}`);
            if (onStatusChange) onStatusChange(nodeId, 'error');
            throw error; // Stop execution on error for now
        }
    }

    return context;
};
