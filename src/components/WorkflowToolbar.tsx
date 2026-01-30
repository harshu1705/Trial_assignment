"use client";

import { Download, Upload, FileJson, PlayCircle } from "lucide-react";
import { useFlowStore } from "@/lib/store";
import productMarketingWorkflow from "@/lib/workflows/product-marketing.json";
import { useRef } from "react";

export const WorkflowToolbar = () => {
    const { nodes, edges, setNodes, setEdges } = useFlowStore();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleExport = () => {
        const data = {
            nodes,
            edges,
            exportedAt: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `workflow-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const content = event.target?.result as string;
                const parsed = JSON.parse(content);
                if (parsed.nodes && parsed.edges) {
                    setNodes(parsed.nodes);
                    setEdges(parsed.edges);
                } else {
                    alert("Invalid workflow file format.");
                }
            } catch (err) {
                console.error("Failed to parse workflow file", err);
                alert("Failed to parse JSON file.");
            }
        };
        reader.readAsText(file);
        // Reset input
        e.target.value = "";
    };

    const loadSample = () => {
        if (confirm("This will overwrite your current workflow. Continue?")) {
            // @ts-ignore
            setNodes(productMarketingWorkflow.nodes);
            // @ts-ignore
            setEdges(productMarketingWorkflow.edges);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".json"
                className="hidden"
            />

            <button
                onClick={loadSample}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors"
                title="Load Product Marketing Sample"
            >
                <PlayCircle className="w-3.5 h-3.5" />
                Load Sample
            </button>

            <div className="h-4 w-[1px] bg-slate-200 mx-1" />

            <button
                onClick={handleImportClick}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors"
            >
                <Upload className="w-3.5 h-3.5" />
                Import
            </button>

            <button
                onClick={handleExport}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-md transition-colors"
            >
                <Download className="w-3.5 h-3.5" />
                Export
            </button>
        </div>
    );
};
