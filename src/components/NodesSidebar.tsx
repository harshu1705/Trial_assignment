"use client";

import { CaseSensitive, Bug, Sparkles, Eye, Image, Video, Scissors, Film } from "lucide-react";

export const NodesSidebar = () => {
    const onDragStart = (event: React.DragEvent, nodeType: string) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.effectAllowed = "move";
    };

    return (
        <aside className="w-[160px] h-full bg-gradient-to-b from-slate-50 to-white border-r border-slate-200 p-3 flex flex-col space-y-3 shadow-sm z-10 shrink-0 overflow-y-auto">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2">
                Nodes
            </h2>

            {/* Input Nodes */}
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide px-2">Input</div>

            <div
                className="group relative flex flex-col items-center p-2 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-emerald-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing hover:scale-105"
                onDragStart={(event) => onDragStart(event, "text")}
                draggable
            >
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-md group-hover:scale-110 transition-transform">
                    <CaseSensitive className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 mt-1">Text</span>
            </div>

            <div
                className="group relative flex flex-col items-center p-2 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-blue-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing hover:scale-105"
                onDragStart={(event) => onDragStart(event, "uploadImage")}
                draggable
            >
                <div className="p-2 bg-blue-50 text-blue-600 rounded-md group-hover:scale-110 transition-transform">
                    <Image className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 mt-1">Image</span>
            </div>

            <div
                className="group relative flex flex-col items-center p-2 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-purple-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing hover:scale-105"
                onDragStart={(event) => onDragStart(event, "uploadVideo")}
                draggable
            >
                <div className="p-2 bg-purple-50 text-purple-600 rounded-md group-hover:scale-110 transition-transform">
                    <Video className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 mt-1">Video</span>
            </div>

            {/* Processing Nodes */}
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide px-2 pt-2">Processing</div>

            <div
                className="group relative flex flex-col items-center p-2 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-purple-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing hover:scale-105"
                onDragStart={(event) => onDragStart(event, "llm")}
                draggable
            >
                <div className="p-2 bg-purple-50 text-purple-600 rounded-md group-hover:scale-110 transition-transform">
                    <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 mt-1">LLM</span>
            </div>

            <div
                className="group relative flex flex-col items-center p-2 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-cyan-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing hover:scale-105"
                onDragStart={(event) => onDragStart(event, "vision")}
                draggable
            >
                <div className="p-2 bg-cyan-50 text-cyan-600 rounded-md group-hover:scale-110 transition-transform">
                    <Eye className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 mt-1">Vision</span>
            </div>

            <div
                className="group relative flex flex-col items-center p-2 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-green-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing hover:scale-105"
                onDragStart={(event) => onDragStart(event, "cropImage")}
                draggable
            >
                <div className="p-2 bg-green-50 text-green-600 rounded-md group-hover:scale-110 transition-transform">
                    <Scissors className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 mt-1">Crop</span>
            </div>

            <div
                className="group relative flex flex-col items-center p-2 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-orange-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing hover:scale-105"
                onDragStart={(event) => onDragStart(event, "extractFrame")}
                draggable
            >
                <div className="p-2 bg-orange-50 text-orange-600 rounded-md group-hover:scale-110 transition-transform">
                    <Film className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 mt-1">Frame</span>
            </div>

            {/* Utility Nodes */}
            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wide px-2 pt-2">Utility</div>

            <div
                className="group relative flex flex-col items-center p-2 bg-white border border-slate-200 rounded-lg cursor-grab hover:border-slate-500 hover:shadow-md transition-all duration-200 active:cursor-grabbing hover:scale-105"
                onDragStart={(event) => onDragStart(event, "debug")}
                draggable
            >
                <div className="p-2 bg-slate-50 text-slate-600 rounded-md group-hover:scale-110 transition-transform">
                    <Bug className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-700 mt-1">Debug</span>
            </div>
        </aside>
    );
};
