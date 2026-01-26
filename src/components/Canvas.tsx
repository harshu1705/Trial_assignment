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
        const maxAttempts = 60; // 5 minutes max (5s intervals)
        let attempts = 0;

        const poll = async () => {
            if (attempts >= maxAttempts) {
                console.log("Polling timeout - workflow may still be running");
                setIsRunning(false);
                return;
            }

            try {
                const response = await fetch(`/api/execute/${runId}`);
                const data = await response.json();

                console.log("Run status:", data.status);

                // Update node states if we have node status data
                if (data.output?.nodeStatus) {
                    const nodeStatusMap = data.output.nodeStatus;
                    setNodes((nds) =>
                        nds.map((n) => ({
                            ...n,
                            data: {
                                ...n.data,
                                status: nodeStatusMap[n.id] || 'idle'
                            },
                        }))
                    );
                }

                if (data.isCompleted || data.isFailed) {
                    // Execution finished
                    if (data.isFailed) {
                        alert(`Workflow failed: ${data.error || 'Unknown error'}`);
                        // Mark all nodes as error if no specific status
                        if (!data.output?.nodeStatus) {
                            setNodes((nds) =>
                                nds.map((n) => ({
                                    ...n,
                                    data: { ...n.data, status: 'error' },
                                }))
                            );
                        }
                    } else {
                        console.log("Workflow completed successfully!", data.output);
                    }

                    setIsRunning(false);
                    return;
                }

                // Still running, poll again
                attempts++;
                setTimeout(poll, 2000); // Poll every 2 seconds for faster feedback

            } catch (error: any) {
                console.error("Failed to poll status:", error);
                setIsRunning(false);
            }
        };

        poll();
    };

    const handleRunWorkflow = async () => {
        if (isRunning) return;
        setIsRunning(true);

        // Set all nodes to running state initially
        setNodes((nds) =>
            nds.map((n) => ({
                ...n,
                data: { ...n.data, status: 'running' },
            }))
        );

        try {
            // Call the API endpoint to trigger execution
            const response = await fetch('/api/execute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to execute workflow');
            }

            console.log('Workflow triggered successfully:', data.runId);

            // Start polling for status updates
            pollRunStatus(data.runId);

        } catch (error: any) {
            console.error("Workflow failed", error);
            alert(`Error: ${error.message}`);

            // Mark all nodes as error
            setNodes((nds) =>
                nds.map((n) => ({
                    ...n,
                    data: { ...n.data, status: 'error' },
                }))
            );

            setIsRunning(false);
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
                        <span>{isRunning ? "Running..." : "Run Workflow"}</span>
                    </button>
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
