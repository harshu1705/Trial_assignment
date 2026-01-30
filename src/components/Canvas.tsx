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
import { validateWorkflow } from "@/lib/validation";
import { Play, RotateCcw, RotateCw, AlertTriangle, Loader2, MousePointerClick } from "lucide-react";
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
    const [validationError, setValidationError] = useState<string | null>(null);

    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const { screenToFlowPosition } = useReactFlow();

    // Validate on change
    useEffect(() => {
        const result = validateWorkflow(nodes, edges);
        setValidationError(result.isValid ? null : result.error || "Invalid workflow");
    }, [nodes, edges]);

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
        const sourceHandle = connection.sourceHandle;
        const targetHandle = connection.targetHandle;

        if (sourceHandle && targetHandle) {
            const sourceType = sourceHandle.split('-')[0];
            const targetType = targetHandle.split('-')[0];

            if (sourceType !== targetType) {
                return false;
            }
        }

        // 2. Cycle Detection
        const currentNodes = useFlowStore.getState().nodes;
        const currentEdges = useFlowStore.getState().edges;

        if (isCyclic(currentNodes, currentEdges, connection as Connection)) {
            return false;
        }

        return true;
    }, []);


    // Helper for polling
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

                if (data.output?.results) {
                    const resultsMap = data.output.results;

                    // Update Store
                    const currentNodes = useFlowStore.getState().nodes;
                    const updatedNodes = currentNodes.map((n) => {
                        const result = resultsMap[n.id];

                        // If no result yet, keep current state (or 'running' if checking)
                        if (!result) return {
                            ...n,
                            data: {
                                ...n.data,
                                status: currentStatus === "RUNNING" ? 'running' : n.data.status
                            }
                        };

                        return {
                            ...n,
                            data: {
                                ...n.data,
                                // Map backend 'success' to frontend 'completed'
                                status: result.status === 'success' ? 'completed' : (result.status === 'failed' ? 'error' : 'running'),
                                output: result.output, // ✅ This updates the LLM text!
                                error: result.error,
                                _meta: result._meta
                            }
                        };
                    });

                    useFlowStore.getState().setNodes(updatedNodes);
                } else if (data.output?.nodeStatus) {
                    // Fallback to old property if results missing (backward compat)
                    const nodeStatusMap = data.output.nodeStatus;
                    const currentNodes = useFlowStore.getState().nodes;
                    const updatedNodes = currentNodes.map((n) => {
                        return {
                            ...n,
                            data: {
                                ...n.data,
                                status: nodeStatusMap[n.id] || (currentStatus === "RUNNING" ? 'running' : n.data.status)
                            }
                        };
                    });
                    useFlowStore.getState().setNodes(updatedNodes);
                }

                if (currentStatus === "COMPLETED" || currentStatus === "FAILED") {
                    setIsRunning(false);

                    // Revert running state but keep node status for review? 
                    // Actually requirement says "Reset to Run", but we probably want to keep the visual state 
                    // on the nodes until they are edited or run again.
                    // But previous logic was to reset to 'idle'. 
                    // Let's keep the logic that was working: 
                    // "Reset all nodes to idle state for 'clean canvas'" was the previous comment, 
                    // but maybe we should leave them as completed/failed so status is visible?
                    // Reverting to previous working state for now.

                    /* 
                    const finalNodes = useFlowStore.getState().nodes.map(n => ({
                        ...n,
                        data: { ...n.data, status: 'idle' }
                    }));
                    useFlowStore.getState().setNodes(finalNodes);
                    */

                    // Actually, usually you want to see the green/red nodes. 
                    // Let's NOT reset to idle immediately. Let the user see the result.
                    // The 'Run' button resets them at the start of the next run.

                    if (currentStatus === "FAILED") {
                        // Optional global alert
                        // alert(`Workflow execution failed: ${data.error || "Unknown error"}`);
                    }
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

        const validation = validateWorkflow(nodes, edges);
        if (!validation.isValid) {
            // Should be disabled, but strict check here
            return;
        }

        setIsRunning(true);
        setRunStatus("QUEUED");

        const currentNodes = useFlowStore.getState().nodes;
        // Reset node states to idle before new run
        useFlowStore.getState().setNodes(
            currentNodes.map(n => ({ ...n, data: { ...n.data, status: 'idle' } }))
        );

        try {
            const response = await fetch('/api/execute', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nodes, edges }),
            });

            // Get the response data first
            const data = await response.json();

            // Check if response is not ok
            if (!response.ok) {
                const errorMsg = data?.error || `Server error (${response.status})`;
                console.error('❌ Workflow trigger failed:', errorMsg);
                throw new Error(errorMsg);
            }

            // Check if success flag is false
            if (!data.success) {
                const errorMsg = data?.error || 'Failed to trigger workflow';
                console.error('❌ Workflow trigger failed:', errorMsg);
                throw new Error(errorMsg);
            }

            console.log('✅ Workflow triggered successfully! Run ID:', data.runId);
            pollRunStatus(data.runId);

        } catch (error: any) {
            console.error('❌ Error in handleRunWorkflow:', error);

            // Show user-friendly error message
            let errorMessage = 'Failed to start workflow';
            if (error.message.includes('fetch')) {
                errorMessage = 'Network error - Is the server running?';
            } else if (error.message.includes('Prisma')) {
                errorMessage = 'Database error - Check if DATABASE_URL is configured';
            } else if (error.message.includes('Trigger')) {
                errorMessage = 'Trigger.dev error - Is trigger.dev dev running?';
            } else if (error.message) {
                errorMessage = error.message;
            }

            alert(`❌ Error: ${errorMessage}\n\nCheck the console for details.`);

            setIsRunning(false);
            setRunStatus("FAILED");
        }
    };

    return (
        <div className="h-full w-full bg-slate-50 relative" ref={reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                isValidConnection={isValidConnection}
                nodeTypes={nodeRegistry}
                onDrop={onDrop}
                onDragOver={onDragOver}
                fitView
                deleteKeyCode={["Backspace", "Delete"]}
                multiSelectionKeyCode={["Control", "Meta"]}
            >
                <Background />
                <Controls />
                <MiniMap />

                <Panel position="top-right" className="flex gap-2 p-4">
                    <div className="flex bg-white rounded-lg shadow-sm border border-slate-200 mr-4">
                        <button onClick={() => useFlowStore.temporal.getState().undo()} className="p-2 hover:bg-slate-50 text-slate-600 rounded-l-lg border-r border-slate-100" title="Undo (Ctrl+Z)">
                            <RotateCcw className="w-4 h-4" />
                        </button>
                        <button onClick={() => useFlowStore.temporal.getState().redo()} className="p-2 hover:bg-slate-50 text-slate-600 rounded-r-lg" title="Redo (Ctrl+Y)">
                            <RotateCw className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="relative group">
                        <button
                            onClick={handleRunWorkflow}
                            disabled={isRunning || !!validationError}
                            className={`
                                flex items-center space-x-2 px-6 py-2 rounded-full font-bold shadow-lg transition-all
                                ${isRunning
                                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                    : validationError
                                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                        : "bg-emerald-500 text-white hover:bg-emerald-600 hover:scale-105 active:scale-95"}
                            `}
                        >
                            {isRunning ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Play className="w-5 h-5 fill-current" />
                            )}
                            <span>
                                {isRunning ? "Running..." : "Run"}
                            </span>
                        </button>

                        {/* Tooltip for Disabled State */}
                        {validationError && (
                            <div className="absolute top-full mt-2 right-0 w-64 bg-slate-800 text-white text-xs p-2 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                                <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                                    <span>{validationError}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </Panel>
            </ReactFlow>

            {/* Empty State */}
            {nodes.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-dashed border-slate-300 text-center max-w-sm">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MousePointerClick className="w-6 h-6 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-700 mb-1">Start Building</h3>
                        <p className="text-slate-500 text-sm">
                            Drag nodes from the sidebar onto the canvas to create your first AI workflow.
                        </p>
                    </div>
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
