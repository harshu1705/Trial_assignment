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
} from "@xyflow/react";
import { nodeRegistry } from "./nodes/nodeRegistry";

import "@xyflow/react/dist/style.css";


const initialNodes: Node[] = [
    {
        id: "1",
        position: { x: 100, y: 100 },
        data: { label: "Debug Node 1" },
        type: "debug",
    },
    {
        id: "2",
        position: { x: 500, y: 100 },
        data: { label: "Debug Node 2" },
        type: "debug",
    },
    {
        id: "3",
        position: { x: 100, y: 400 },
        data: { label: "Text Node" },
        type: "text",
    },
];

const initialEdges: Edge[] = []; // No initial connections

export const Canvas = () => {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    return (
        <div className="h-full w-full relative">
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
