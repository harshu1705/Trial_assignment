"use client";

import { CaseSensitive, Bug } from "lucide-react";

export const NodesSidebar = () => {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside className="w-[200px] h-full bg-white border-r border-slate-200 p-4 flex flex-col space-y-4 shadow-sm z-10 shrink-0">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Nodes
            </h2>

            <div
                className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-emerald-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing"
                onDragStart={(event) => onDragStart(event, "text")}
                draggable
            >
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-md">
                    <CaseSensitive className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">Text Node</span>
                    <span className="text-[10px] text-slate-400">Input source</span>
                </div>
            </div>

            <div
                className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-emerald-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing"
                onDragStart={(event) => onDragStart(event, "debug")}
                draggable
            >
                <div className="p-2 bg-slate-50 text-slate-600 rounded-md">
                    <Bug className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">Debug Node</span>
                    <span className="text-[10px] text-slate-400">Inspector</span>
                </div>
            </div>

            <div className="mt-auto pt-4 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 text-center">
                    Drag nodes to canvas
                </p>
            </div>
        </aside>
    );
};
