"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    Connection,
    Edge,
    Node,
    Panel,
    ReactFlowProvider,
    useReactFlow,
    EdgeChange,
    NodeChange,
} from "@xyflow/react";
import { nodeRegistry } from "./nodes/nodeRegistry";
import { Play, RotateCcw, RotateCw } from "lucide-react";
import { useFlowStore, isCyclic } from "@/lib/store";
import { useShallow } from 'zustand/react/shallow';

import "@xyflow/react/dist/style.css";

// Separate Flow component to use hooks
const Flow = () => {
    // Select state from store
    const {
        nodes,
        edges,
        onNodesChange,
        onEdgesChange,
        onConnect,
        addNode
    } = useFlowStore(useShallow((state) => ({
        nodes: state.nodes,
        edges: state.edges,
        onNodesChange: state.onNodesChange,
        onEdgesChange: state.onEdgesChange,
        onConnect: state.onConnect,
        addNode: state.addNode,
    })));

    const [isRunning, setIsRunning] = useState(false);
    const [runStatus, setRunStatus] = useState<"IDLE" | "QUEUED" | "RUNNING" | "COMPLETED" | "FAILED">("IDLE");
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { screenToFlowPosition, getNodes, getEdges } = useReactFlow();

    // Undo/Redo via keyboard
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
                if (event.shiftKey) {
                    useFlowStore.temporal.getState().redo();
                } else {
                    useFlowStore.temporal.getState().undo();
                }
            }
            if ((event.metaKey || event.ctrlKey) && event.key === 'y') {
                useFlowStore.temporal.getState().redo();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const onDragOver = useCallback((event: React.DragEvent) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const onDrop = useCallback(
        (event: React.DragEvent) => {
            event.preventDefault();

            const type = event.dataTransfer.getData("application/reactflow");

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
                data: { label: `${type} node` },
                style: { width: 280 },
            };

            addNode(newNode);
        },
        [screenToFlowPosition, addNode]
    );

    const isValidConnection = useCallback((connection: Connection | Edge) => {
        // 1. Type Validation (Strict Handle Types)
        // Handles are named: type-role, e.g. "text-source", "text-prompt", "image-url"
        const sourceHandle = connection.sourceHandle;
        const targetHandle = connection.targetHandle;

        if (sourceHandle && targetHandle) {
            const sourceType = sourceHandle.split('-')[0];
            const targetType = targetHandle.split('-')[0];

            if (sourceType !== targetType) {
                return false; // Type mismatch (e.g. text -> image)
            }
        }

        // 2. Cycle Detection
        // uses current nodes/edges from store (or hook)
        // Pass current store nodes/edges
        // Using getNodes/getEdges from ReactFlow hook to ensure fresh state if store lags slightly, 
        // but store is source of truth.
        const currentNodes = useFlowStore.getState().nodes;
        const currentEdges = useFlowStore.getState().edges; // Edges before connection

        // Pass as Connection to match utility signature
        if (isCyclic(currentNodes, currentEdges, connection as Connection)) {
            return false;
        }

        return true;
    }, []);


    // Helper for polling (unchanged mainly, but updates store)
    const pollRunStatus = async (runId: string) => {
        const pollInterval = 1000;
        const maxAttempts = 300;
        let attempts = 0;

        const checkStatus = async () => {
            if (attempts >= maxAttempts) {
                setRunStatus("FAILED");
                setIsRunning(false);
                return;
            }

            try {
                const response = await fetch(`/api/execute/${runId}`);
                if (!response.ok) throw new Error("Failed to fetch status");
                const data = await response.json();

                let currentStatus: typeof runStatus = "RUNNING";
                if (data.status === "QUEUED" || data.status === "WAITING") currentStatus = "QUEUED";
                else if (data.status === "COMPLETED") currentStatus = "COMPLETED";
                else if (["FAILED", "CANCELED", "TIMED_OUT", "CRASHED"].includes(data.status)) currentStatus = "FAILED";

                setRunStatus(currentStatus);

                if (data.output?.nodeStatus) {
                    const nodeStatusMap = data.output.nodeStatus;
                    // const results = data.output.results || {}; // Stop reading results into node data

                    // Update Store
                    const currentNodes = useFlowStore.getState().nodes;
                    const updatedNodes = currentNodes.map((n) => {
                        // const executionResult = results[n.id] || {}; // No longer needed
                        return {
                            ...n,
                            data: {
                                ...n.data,
                                // ...executionResult, // DO NOT POLLUTE NODE DATA
                                status: nodeStatusMap[n.id] || (currentStatus === "RUNNING" ? 'running' : n.data.status)
                            }
                        };
                    });

                    useFlowStore.getState().setNodes(updatedNodes);
                }

                if (currentStatus === "COMPLETED" || currentStatus === "FAILED") {
                    setIsRunning(false);

                    // Reset all nodes to idle state for "clean canvas"
                    const finalNodes = useFlowStore.getState().nodes.map(n => ({
                        ...n,
                        data: { ...n.data, status: 'idle' }
                    }));
                    useFlowStore.getState().setNodes(finalNodes);

                    if (currentStatus === "FAILED") alert(`Workflow execution failed: ${data.error ? JSON.stringify(data.error) : "Unknown error"}`);
                    return;
                }

                attempts++;
                setTimeout(checkStatus, pollInterval);

            } catch (error) {
                console.error("Polling error:", error);
                attempts++;
                setTimeout(checkStatus, pollInterval);
            }
        };
        checkStatus();
    };


    const handleRunWorkflow = async () => {
        if (isRunning) return;
        setIsRunning(true);
        setRunStatus("QUEUED");

        const currentNodes = useFlowStore.getState().nodes;
        // Reset node states
        useFlowStore.getState().setNodes(
            currentNodes.map(n => ({ ...n, data: { ...n.data, status: 'idle' } }))
        );

        try {
            const response = await fetch('/api/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) throw new Error('Failed to trigger workflow');
            const data = await response.json();
            if (!data.success) throw new Error(data?.error || 'Failed to trigger workflow');

            console.log('Workflow triggered, Run ID:', data.runId);
            pollRunStatus(data.runId);

        } catch (error: any) {
            console.error(error);
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
                isValidConnection={isValidConnection} // Validation hook
                nodeTypes={nodeRegistry}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
                deleteKeyCode={["Backspace", "Delete"]} // Ensure delete works
                multiSelectionKeyCode={["Control", "Meta"]}
            >
                <Background />
                <Controls />
                <MiniMap />

                <Panel position="top-right" className="flex gap-2 p-4">
                    {/* Undo/Redo Buttons (Optional visual aid) */}
                    <div className="flex bg-white rounded-lg shadow-sm border border-slate-200 mr-4">
                        <button onClick={() => useFlowStore.temporal.getState().undo()} className="p-2 hover:bg-slate-50 text-slate-600 rounded-l-lg border-r border-slate-100" title="Undo (Ctrl+Z)">
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button onClick={() => useFlowStore.temporal.getState().redo()} className="p-2 hover:bg-slate-50 text-slate-600 rounded-r-lg" title="Redo (Ctrl+Y)">
                            <RotateCw className="w-4 h-4" />
                        </button>
                    </div>

                    <button
                        onClick={handleRunWorkflow}
                        disabled={isRunning}
                        className={`
                            flex items-center space-x-2 px-6 py-2 rounded-full font-bold shadow-lg transition-all
                            ${isRunning
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                : "bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105 active:scale-95"}
                        `}
                    >
                        <Play className={`w-5 h-5 ${isRunning ? "animate-pulse" : "fill-current"}`} />
                        <span>
                            {runStatus === "QUEUED" ? "Queued" :
                                runStatus === "RUNNING" ? "Running" :
                                    "Run"}
                        </span>
                    </button>
                </Panel>
            </ReactFlow>
            {nodes.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                    <p className="text-slate-500 text-lg font-medium opacity-50 select-none">
                        Drag nodes from the sidebar to start
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
