import {
  task
} from "./chunk-NL3CHZZW.mjs";
import {
  __name,
  init_esm
} from "./chunk-244PAGAH.mjs";

// src/trigger/workflow.ts
init_esm();

// src/lib/execution/engine.ts
init_esm();

// src/lib/execution/ExecutorRegistry.ts
init_esm();

// src/lib/execution/nodes/TextNodeExecutor.ts
init_esm();
var TextNodeExecutor = class {
  static {
    __name(this, "TextNodeExecutor");
  }
  async execute(input, context) {
    context.log("text", "Executing Text Node...");
    const textValue = input.value || "Default Text";
    context.log("text", `Generated text: "${textValue}"`);
    return {
      text: textValue
    };
  }
};

// src/lib/execution/nodes/DebugNodeExecutor.ts
init_esm();
var DebugNodeExecutor = class {
  static {
    __name(this, "DebugNodeExecutor");
  }
  async execute(input, context) {
    context.log("debug", "Executing Debug Node...");
    const inputs = Object.entries(input).map(([key, val]) => `${key}: ${val}`).join(", ");
    context.log("debug", `Received inputs: { ${inputs} }`);
    return input;
  }
};

// src/lib/execution/nodes/LLMNodeExecutor.ts
init_esm();
var LLMNodeExecutor = class {
  static {
    __name(this, "LLMNodeExecutor");
  }
  async execute(input, context) {
    context.log(this.constructor.name, "LLMNodeExecutor is deprecated. engine.ts now handles LLM nodes directly.");
    throw new Error(
      "LLMNodeExecutor should not be called directly. execution/engine.ts should intercept 'llm' nodes."
    );
  }
};

// src/lib/execution/nodes/VisionNodeExecutor.ts
init_esm();
var VisionNodeExecutor = class {
  static {
    __name(this, "VisionNodeExecutor");
  }
  async execute(input, context) {
    context.log(this.constructor.name, "VisionNodeExecutor is currently disabled due to Groq migration.");
    throw new Error(
      "Vision Node is not yet supported in the Groq migration. Please check back later."
    );
  }
};

// src/lib/execution/ExecutorRegistry.ts
var executorRegistry = {
  text: TextNodeExecutor,
  debug: DebugNodeExecutor,
  llm: LLMNodeExecutor,
  vision: VisionNodeExecutor
};

// src/lib/execution/engine.ts
var getExecutionOrder = /* @__PURE__ */ __name((nodes, edges) => {
  const inDegree = /* @__PURE__ */ new Map();
  const adjList = /* @__PURE__ */ new Map();
  nodes.forEach((node) => {
    inDegree.set(node.id, 0);
    adjList.set(node.id, []);
  });
  edges.forEach((edge) => {
    const source = edge.source;
    const target = edge.target;
    if (!inDegree.has(source) || !inDegree.has(target)) return;
    adjList.get(source)?.push(target);
    inDegree.set(target, (inDegree.get(target) || 0) + 1);
  });
  const queue = [];
  inDegree.forEach((degree, id) => {
    if (degree === 0) {
      queue.push(id);
    }
  });
  const executionOrder = [];
  while (queue.length > 0) {
    const currentId = queue.shift();
    executionOrder.push(currentId);
    const neighbors = adjList.get(currentId) || [];
    for (const neighbor of neighbors) {
      inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }
  if (executionOrder.length !== nodes.length) {
    throw new Error("Cycle detected in workflow: Execution flow contains circular dependencies.");
  }
  return executionOrder;
}, "getExecutionOrder");
async function executeGeminiNode(prompt, apiKey) {
  console.log(`🚀 Sending prompt to Gemini via fetch...`);
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
__name(executeGeminiNode, "executeGeminiNode");
async function executeLLMNode({ prompt }) {
  if (process.env.GEMINI_API_KEY) {
    try {
      return await executeGeminiNode(prompt, process.env.GEMINI_API_KEY);
    } catch (error) {
      console.error("⚠️ Gemini failed, falling back to other providers if available:", error.message);
    }
  }
  if (process.env.GROQ_API_KEY) {
    console.log(`🚀 Sending prompt to Groq (Llama 3.1) via fetch: "${prompt.substring(0, 50)}..."`);
    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          // Updated from decommissioned model
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
    } catch (error) {
      console.error("❌ Groq API execution error:", error);
      if (process.env.GEMINI_API_KEY) throw error;
    }
  }
  if (!process.env.GROQ_API_KEY && !process.env.GEMINI_API_KEY) {
    console.warn("⚠️ No API key found, using mock response");
    return "This is a mock AI response for demonstration purposes. (No API keys configured)";
  }
  throw new Error("Detailed LLM execution failed. Check server logs for provider errors.");
}
__name(executeLLMNode, "executeLLMNode");
var runWorkflow = /* @__PURE__ */ __name(async (nodes, edges, onStatusChange) => {
  const executionOrder = getExecutionOrder(nodes, edges);
  const context = {
    executionId: crypto.randomUUID(),
    nodeResults: /* @__PURE__ */ new Map(),
    logs: [],
    log: /* @__PURE__ */ __name((nodeId, message) => {
      console.log(`[${nodeId}] ${message}`);
      context.logs.push({
        nodeId,
        message,
        timestamp: Date.now()
      });
    }, "log")
  };
  for (const nodeId of executionOrder) {
    const node = nodes.find((n) => n.id === nodeId);
    if (!node) continue;
    console.log("🔥 EXECUTING NODE", node.id, node.type);
    const nodeType = node.type || "unknown";
    if (nodeType.toLowerCase().includes("llm") || nodeType.toLowerCase().includes("ai")) {
      try {
        if (onStatusChange) onStatusChange(nodeId, "running");
        const inputEdges = edges.filter((e) => e.target === nodeId);
        const inputs = { ...node.data };
        for (const edge of inputEdges) {
          const sourceResult = context.nodeResults.get(edge.source);
          if (sourceResult) {
            Object.assign(inputs, sourceResult);
          }
        }
        const prompt = inputs.text || inputs.prompt || inputs.value || "";
        if (!prompt) {
          throw new Error("LLM node received empty prompt");
        }
        context.log(nodeId, `Executing LLM Node with prompt: "${prompt.substring(0, 50)}..."`);
        const geminiText = await executeLLMNode({
          prompt
        });
        context.log(nodeId, `Generated ${geminiText.length} characters`);
        context.nodeResults.set(nodeId, {
          llmResponse: {
            text: geminiText
          }
        });
        if (onStatusChange) onStatusChange(nodeId, "completed");
        continue;
      } catch (error) {
        context.log(nodeId, `Error in LLM execution: ${error.message}`);
        console.error(`[${nodeId}] Full Error Stack:`, error);
        if (onStatusChange) onStatusChange(nodeId, "error");
        throw error;
      }
    }
    const ExecutorClass = executorRegistry[nodeType];
    if (!ExecutorClass) {
      context.log(nodeId, `No executor found for type: ${nodeType}`);
      continue;
    }
    try {
      if (onStatusChange) onStatusChange(nodeId, "running");
      const executor = new ExecutorClass();
      const inputEdges = edges.filter((e) => e.target === nodeId);
      const inputs = { ...node.data };
      for (const edge of inputEdges) {
        const sourceResult = context.nodeResults.get(edge.source);
        if (sourceResult) {
          Object.assign(inputs, sourceResult);
        }
      }
      const output = await executor.execute(inputs, context);
      context.nodeResults.set(nodeId, output);
      if (onStatusChange) onStatusChange(nodeId, "completed");
    } catch (error) {
      context.log(nodeId, `Error executing node: ${error.message}`);
      if (onStatusChange) onStatusChange(nodeId, "error");
      throw error;
    }
  }
  return context;
}, "runWorkflow");

// src/trigger/workflow.ts
var workflowTask = task({
  id: "workflow-task",
  maxDuration: 600,
  // 10 minutes
  run: /* @__PURE__ */ __name(async (payload) => {
    console.log("🚀 Starting workflow execution...");
    console.log(`📊 Received ${payload.nodes.length} nodes and ${payload.edges.length} edges.`);
    const nodeStatus = {};
    payload.nodes.forEach((node) => {
      nodeStatus[node.id] = "idle";
    });
    try {
      const context = await runWorkflow(payload.nodes, payload.edges, (nodeId, status) => {
        console.log(`[${nodeId}] ➡️ ${status}`);
        nodeStatus[nodeId] = status;
      });
      const llmResult = Array.from(context.nodeResults.values()).find((r) => r.llmResponse);
      console.log("✅ Workflow execution complete.");
      return {
        success: true,
        executionId: context.executionId,
        results: Object.fromEntries(context.nodeResults),
        llmResponse: llmResult ? llmResult.llmResponse : void 0,
        // Bubble up for debug/UI checks
        logs: context.logs,
        nodeStatus,
        // Per-node status for UI
        nodesExecuted: context.logs.filter((l) => l.message.includes("Executing")).length
      };
    } catch (error) {
      console.error("❌ Workflow failed:", error);
      return {
        success: false,
        error: error.message || "Unknown error occurred",
        stack: error.stack,
        failedAt: (/* @__PURE__ */ new Date()).toISOString(),
        nodeStatus
        // Include partial status even on failure
      };
    }
  }, "run")
});

export {
  workflowTask
};
//# sourceMappingURL=chunk-7EEQF4IZ.mjs.map
