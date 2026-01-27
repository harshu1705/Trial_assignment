"use client";

import { useState, useCallback, useRef } from "react";
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge,
    Connection,
    Edge,
    Node,
    Panel,
    ReactFlowProvider,
    useReactFlow,
    ReactFlowInstance,
} from "@xyflow/react";
import { nodeRegistry } from "./nodes/nodeRegistry";
import { Play } from "lucide-react";


import "@xyflow/react/dist/style.css";


const initialNodes: Node[] = [
    {
        id: "1",
        type: "text",
        position: { x: 100, y: 100 },
        data: { value: "Hello World" },
    },
    {
        id: "2",
        type: "debug",
        position: { x: 500, y: 150 },
        data: {},
    },
];

const initialEdges: Edge[] = [];

// Inner component to use ReactFlow hooks
const Flow = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [isRunning, setIsRunning] = useState(false);
    const [runStatus, setRunStatus] = useState<"IDLE" | "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED">("IDLE");
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { screenToFlowPosition } = useReactFlow();

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");

            // Check if the dropped element is valid
            if (typeof type === "undefined" || !type) {
                return;
            }

            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });

            const newNode: Node = {
                id: crypto.randomUUID(),
                type,
                position,
                data: { label: `${type} node` }, // Basic data
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, setNodes]
    );

    const pollRunStatus = async (runId: string) => {
        const pollInterval = 1000; // 1 second
        const maxAttempts = 300; // 5 minutes approx
        let attempts = 0;

        const checkStatus = async () => {
            if (attempts >= maxAttempts) {
                console.log("Polling timeout");
                setRunStatus("FAILED");
                setIsRunning(false);
                return;
            }

            try {
                const response = await fetch(`/api/execute/${runId}`);
                if (!response.ok) throw new Error("Failed to fetch status");

                const data = await response.json();
                console.log("Poll status:", data.status);

                // Map Trigger.dev status to our UI status
                // Trigger.dev statuses: "WAITING", "QUEUED", "EXECUTING", "COMPLETED", "FAILED", "CANCELED", "TIMED_OUT"
                let currentStatus: typeof runStatus = "RUNNING";
                if (data.status === "QUEUED" || data.status === "WAITING") {
                    currentStatus = "QUEUED";
                } else if (data.status === "COMPLETED") {
                    currentStatus = "COMPLETED";
                } else if (["FAILED", "CANCELED", "TIMED_OUT", "CRASHED"].includes(data.status)) {
                    currentStatus = "FAILED";
                }

                setRunStatus(currentStatus);

                // Update individual node statuses AND outputs if available
                if (data.output?.nodeStatus) {
                    const nodeStatusMap = data.output.nodeStatus;
                    const results = data.output.results || {}; // Get results from the output

                    setNodes((nds) =>
                        nds.map((n) => {
                            // Merge existing data with execution results (if any for this node)
                            // This allows nodes to display their computed output
                            const executionResult = results[n.id] || {};

                            return {
                                ...n,
                                data: {
                                    ...n.data,
                                    ...executionResult, // Spread result properties (e.g. value, outputUrl)
                                    status: nodeStatusMap[n.id] || (currentStatus === "RUNNING" ? 'running' : n.data.status)
                                },
                            };
                        })
                    );
                }

                if (currentStatus === "COMPLETED" || currentStatus === "FAILED") {
                    setIsRunning(false);
                    if (currentStatus === "FAILED") {
                        alert(`Workflow execution failed: ${data.error ? JSON.stringify(data.error) : "Unknown error"}`);
                    }
                    return; // Stop polling
                }

                attempts++;
                setTimeout(checkStatus, pollInterval);

            } catch (error) {
                console.error("Polling error:", error);
                // Don't stop polling immediately on network error, might be transient
                attempts++;
                setTimeout(checkStatus, pollInterval);
            }
        };

        // Start polling
        checkStatus();
    };

    const handleRunWorkflow = async () => {
        if (isRunning) return;
        setIsRunning(true);
        setRunStatus("QUEUED");

        // Reset node states
        setNodes((nds) =>
            nds.map((n) => ({
                ...n,
                data: { ...n.data, status: 'idle' },
            }))
        );

        try {
            const response = await fetch('/api/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to trigger workflow');
            }

            console.log('Workflow triggered, Run ID:', data.runId);

            // Immediate update if output is present (Blocking/Sync behavior)
            if (data.status === "COMPLETED" && data.output?.results) {
                const results = data.output.results;
                const nodeStatusMap = data.output.nodeStatus || {};

                setNodes((nds) =>
                    nds.map((n) => {
                        const executionResult = results[n.id] || {};
                        return {
                            ...n,
                            data: {
                                ...n.data,
                                ...executionResult,
                                status: nodeStatusMap[n.id] || 'completed'
                            },
                        };
                    })
                );
                setRunStatus("COMPLETED");
                setIsRunning(false);
            } else {
                // Fallback to polling if status is not immediately completed
                pollRunStatus(data.runId);
            }

        } catch (error: any) {
            console.error("Workflow trigger failed", error);
            alert(`Error: ${error.message}`);
            setIsRunning(false);
            setRunStatus("FAILED");
        }
    };

    return (
        <div className="h-full w-full bg-slate-50" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeRegistry}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
            >
                <Background />
                <Controls />
                <MiniMap />

                <Panel position="top-right" className="p-4">
                    <button
                        onClick={handleRunWorkflow}
                        disabled={isRunning}
                        className={`
                            flex items-center space-x-2 px-6 py-3 rounded-full font-bold shadow-lg transition-all
                            ${isRunning
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105 active:scale-95"}
                        `}
                    >
                        <Play className={`w-5 h-5 ${isRunning ? "animate-pulse" : "fill-current"}`} />
                        <span>
                            {runStatus === "QUEUED" ? "Queued..." :
                                runStatus === "RUNNING" ? "Running..." :
                                    "Run Workflow"}
                        </span>
                    </button>
                    {runStatus === "FAILED" && (
                        <div className="mt-2 text-red-500 text-sm font-medium text-center bg-white/80 p-2 rounded shadow">
                            Last Run Failed
                        </div>
                    )}
                </Panel>
            </ReactFlow>
            {nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <p className="text-slate-500 text-lg font-medium opacity-50 select-none">
                        Drag nodes from the sidebar to start building your workflow
                    </p>
                </div>
            )}
        </div>
    );
};

export const Canvas = () => {
    return (
        <ReactFlowProvider>
            <div className="h-screen w-full">
                <Flow />
            </div>
        </ReactFlowProvider>
    );
};
