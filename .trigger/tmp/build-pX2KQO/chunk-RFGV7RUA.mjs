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

// src/lib/execution/ExecutorRegistry.ts
var executorRegistry = {
  "debug": DebugNodeExecutor,
  "text": TextNodeExecutor
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
    const nodeType = node.type || "unknown";
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
      console.log("✅ Workflow execution complete.");
      return {
        success: true,
        executionId: context.executionId,
        results: Object.fromEntries(context.nodeResults),
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
//# sourceMappingURL=chunk-RFGV7RUA.mjs.map
