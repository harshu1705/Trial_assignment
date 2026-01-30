"use client";

import { CaseSensitive, Bug, Sparkles, Eye, Image, Video, Scissors, Film } from "lucide-react";

export const NodesSidebar = () => {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside className="w-[200px] h-full bg-white border-r border-slate-200 p-4 flex flex-col space-y-4 shadow-sm z-10 shrink-0 overflow-y-auto">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
                Nodes
            </h2>

            {/* Input Nodes */}
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-2">Input</div>

            <div
                className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-emerald-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing"
                onDragStart={(event) => onDragStart(event, "text")}
                draggable
            >
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-md">
                    <CaseSensitive className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">Text</span>
                    <span className="text-[10px] text-slate-400">Input source</span>
                </div>
            </div>

            <div
                className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-blue-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing"
                onDragStart={(event) => onDragStart(event, "uploadImage")}
                draggable
            >
                <div className="p-2 bg-blue-50 text-blue-600 rounded-md">
                    <Image className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">Image Upload</span>
                    <span className="text-[10px] text-slate-400">File import</span>
                </div>
            </div>

            <div
                className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-purple-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing"
                onDragStart={(event) => onDragStart(event, "uploadVideo")}
                draggable
            >
                <div className="p-2 bg-purple-50 text-purple-600 rounded-md">
                    <Video className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">Video Upload</span>
                    <span className="text-[10px] text-slate-400">File import</span>
                </div>
            </div>

            {/* Processing Nodes */}
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-4">Processing</div>

            <div
                className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-purple-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing"
                onDragStart={(event) => onDragStart(event, "llm")}
                draggable
            >
                <div className="p-2 bg-purple-50 text-purple-600 rounded-md">
                    <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">LLM</span>
                    <span className="text-[10px] text-slate-400">AI generation</span>
                </div>
            </div>

            <div
                className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-cyan-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing"
                onDragStart={(event) => onDragStart(event, "vision")}
                draggable
            >
                <div className="p-2 bg-cyan-50 text-cyan-600 rounded-md">
                    <Eye className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">Vision</span>
                    <span className="text-[10px] text-slate-400">Image analysis</span>
                </div>
            </div>

            <div
                className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-green-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing"
                onDragStart={(event) => onDragStart(event, "cropImage")}
                draggable
            >
                <div className="p-2 bg-green-50 text-green-600 rounded-md">
                    <Scissors className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">Crop Image</span>
                    <span className="text-[10px] text-slate-400">Edit image</span>
                </div>
            </div>

            <div
                className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-orange-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing"
                onDragStart={(event) => onDragStart(event, "extractFrame")}
                draggable
            >
                <div className="p-2 bg-orange-50 text-orange-600 rounded-md">
                    <Film className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">Extract Frame</span>
                    <span className="text-[10px] text-slate-400">Video snapshot</span>
                </div>
            </div>

            {/* Utility Nodes */}
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-4">Utility</div>

            <div
                className="flex items-center space-x-3 p-3 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-slate-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing"
                onDragStart={(event) => onDragStart(event, "debug")}
                draggable
            >
                <div className="p-2 bg-slate-50 text-slate-600 rounded-md">
                    <Bug className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-700">Debug</span>
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
