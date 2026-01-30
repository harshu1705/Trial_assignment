import { Edge, Node } from "@xyflow/react";
import { ExecutableNode, ExecutionContext, ExecutionLog } from "./types";
import { executorRegistry } from "./ExecutorRegistry";

/**
 * Determines the execution execution order of nodes based on the graph topology.
 * Uses Kahn's algorithm for Topological Sort.
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
 * Executes a prompt using Google's Gemini API via fetch (REST).
 */
async function executeGeminiNode(prompt: string, apiKey: string) {
    console.log(`🚀 Sending prompt to Gemini via fetch...`);

    // Using gemini-1.5-flash for speed and cost effectiveness
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
        })
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Gemini API Error: ${response.status} - ${errorBody}`);
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) throw new Error("Gemini response missing text content");

    console.log("✅ Gemini response received length:", text.length);
    return text;
}

/**
 * Executes a prompt using Groq API via fetch (REST).
 */
async function executeGroqNode(prompt: string, apiKey: string) {
    console.log(`🚀 Sending prompt to Groq (Llama 3.3 70B) via fetch: "${prompt.substring(0, 50)}..."`);

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 2048,
        })
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Groq API Error: ${response.status} - ${errorBody}`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;

    if (!text) throw new Error("Groq response missing text content");

    console.log("✅ Groq response received length:", text.length);
    return text;
}

/**
 * Standalone executor for LLM nodes with robust failover.
 */
export async function executeLLMNode({ prompt }: { prompt: string }) {
    const groqKey = process.env.GROQ_API_KEY;
    const geminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

    console.log("🤖 executeLLMNode called with prompt length:", prompt.length);

    // PRIORITY CHANGE: User requested fast running check. 
    // Gemini 1.5 Flash is extremely fast and stable. 
    // Switching to Gemini First -> Groq Second.

    // 1. Try Gemini (Primary)
    if (geminiKey) {
        try {
            console.log("🌟 Attempting Primary Provider: Google Gemini (Flash)...");
            const start = Date.now();
            const result = await executeGeminiNode(prompt, geminiKey);
            console.log(`✅ Gemini Success in ${Date.now() - start}ms`);
            return result;
        } catch (error: any) {
            console.error("⚠️ Gemini Failed:", error.message);
            console.log("🔄 Switching to Fallback Provider: Groq...");
        }
    } else {
        console.warn("⚠️ GEMINI_API_KEY missing, skipping Gemini.");
    }

    // 2. Try Groq (Fallback)
    if (groqKey) {
        try {
            console.log("⚡ Attempting Fallback Provider: Groq (Llama 3)...");
            const start = Date.now();
            const result = await executeGroqNode(prompt, groqKey);
            console.log(`✅ Groq Success in ${Date.now() - start}ms`);
            return result;
        } catch (error: any) {
            console.error("⚠️ Groq Execution Failed:", error.message);
        }
    } else {
        console.warn("⚠️ GROQ_API_KEY missing, skipping Groq.");
    }

    // 3. Mock Fallback (if everything failed or no keys)
    console.warn("⚠️ All LLM Providers failed or missing keys. Returning Mock response.");
    return `[MOCK RESPONSE] Because AI keys are missing or failed, here is a simulated response for: "${prompt.substring(0, 20)}..."`;
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

                const prompt = (inputs.text as string) || (inputs.prompt as string) || (inputs.value as string) || (inputs.output as string) || "";

                if (!prompt) {
                    throw new Error("LLM node received empty prompt");
                }

                const startTime = Date.now();
                context.log(nodeId, `Executing LLM Node with prompt: "${prompt.substring(0, 50)}..."`);

                // SIMULATION: Delay for 2.5 seconds to demonstrate Yellow/Red duration
                await new Promise(resolve => setTimeout(resolve, 2500));

                // SIMULATION: Force failure if prompt contains "fail"
                if (prompt.toLowerCase().includes("fail")) {
                    throw new Error("Simulated failure: Invalid input detected in LLM Node.");
                }

                const geminiText = await executeLLMNode({
                    prompt: prompt,
                });
                const endTime = Date.now();
                const duration = endTime - startTime;

                context.log(nodeId, `Generated ${geminiText.length} characters in ${duration}ms`);

                context.nodeResults.set(nodeId, {
                    output: geminiText, // ← MUST be a string
                    status: 'success',
                    _meta: {
                        type: nodeType,
                        label: node.data.label,
                        startTime,
                        endTime,
                        duration,
                        inputs, // ← Store inputs
                    }
                });

                if (onStatusChange) onStatusChange(nodeId, 'completed');
                continue; // Skip generic executor

            } catch (error: any) {
                const endTime = Date.now(); // Capture time even on failure
                context.log(nodeId, `Error in LLM execution: ${error.message}`);
                console.error(`[${nodeId}] Full Error Stack:`, error);

                // Store failed result
                context.nodeResults.set(nodeId, {
                    status: 'failed',
                    error: error.message,
                    _meta: {
                        type: nodeType,
                        label: node.data.label,
                        startTime: Date.now(), // Approximate
                        endTime,
                        duration: 0, // Failed nodes can have 0 duration or track it
                        inputs: { ...node.data }, // Best effort inputs
                    }
                });

                if (onStatusChange) onStatusChange(nodeId, 'error');
                // Break loop instead of throwing to allow partial result return
                break;
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

            const startTime = Date.now();
            const output = await executor.execute(inputs, context);
            const endTime = Date.now();
            const duration = endTime - startTime;

            context.nodeResults.set(nodeId, {
                ...output,
                status: 'success',
                _meta: {
                    type: nodeType,
                    label: node.data.label,
                    startTime,
                    endTime,
                    duration,
                    inputs, // ← Store inputs
                }
            });

            if (onStatusChange) onStatusChange(nodeId, 'completed');

        } catch (error: any) {
            context.log(nodeId, `Error executing node: ${error.message}`);

            // Store failed result
            context.nodeResults.set(nodeId, {
                status: 'failed',
                error: error.message,
                _meta: {
                    type: nodeType,
                    label: node.data.label,
                    startTime: Date.now(),
                    endTime: Date.now(),
                    duration: 0,
                    inputs: { ...node.data },
                }
            });

            if (onStatusChange) onStatusChange(nodeId, 'error');
            break; // Stop execution on error
        }
    }

    return context;
};
