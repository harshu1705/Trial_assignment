"use client";

import { useCallback } from "react";
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
} from "@xyflow/react";
import { nodeRegistry } from "./nodes/nodeRegistry";
import { runWorkflow } from "@/lib/execution/engine";
import { Play } from "lucide-react";
import { useState } from "react";

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

export const Canvas = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const [isRunning, setIsRunning] = useState(false);

    const onConnect = (params: Connection) => {
        setEdges((eds) => addEdge(params, eds));
    };

    const handleRunWorkflow = async () => {
        if (isRunning) return;
        setIsRunning(true);

        try {
            await runWorkflow(nodes, edges, (nodeId, status) => {
                // Determine if we need to update node data or just visual status
                // For BaseNode, we are passing status as a prop, but here we need to map it to the React Flow node.
                // React Flow nodes typically take style or className, or data.
                // However, since our custom nodes use BaseNode, they can read 'data.status' if we put it there,
                // OR we can use the 'className' or 'style' to inject status.

                // Better approach: Update the node.data.status
                setNodes((nds) =>
                    nds.map((n) => {
                        if (n.id === nodeId) {
                            return {
                                ...n,
                                data: { ...n.data, status },
                            };
                        }
                        return n;
                    })
                );
            });
        } catch (error) {
            console.error("Workflow failed", error);
        } finally {
            setIsRunning(false);
        }
    };

    return (
        <div className="h-screen w-full bg-slate-50">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                nodeTypes={nodeRegistry}
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
