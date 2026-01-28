"use client";

import { useEffect, useState } from "react";
import { Clock, Activity } from "lucide-react";

type Run = {
    id: string;
    createdAt: string;
    status: string;
    scope: string;
};

export const RunHistorySidebar = () => {
    const [runs, setRuns] = useState<Run[]>([]);

    const fetchRuns = async () => {
        try {
            // Using "default" as placeholder ID since existing schema doesn't link runs to workflows
            const res = await fetch("/api/workflows/default/runs");
            if (res.ok) {
                const data = await res.json();
                setRuns(data.runs);
            }
        } catch (error) {
            console.error("Failed to fetch runs", error);
        }
    };

    // Initial fetch and poll every 5 seconds to keep history fresh
    useEffect(() => {
        fetchRuns();
        const interval = setInterval(fetchRuns, 5000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'success':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'failed':
            case 'failure':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'partial':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    return (
        <div className="w-80 border-l border-slate-200 bg-white flex flex-col h-full">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center space-x-2 text-slate-700">
                    <Clock className="w-4 h-4" />
                    <span className="font-semibold text-sm">Run History</span>
                </div>
                <button
                    onClick={fetchRuns}
                    className="p-1 hover:bg-slate-200 rounded-full transition-colors"
                    title="Refresh"
                >
                    <Activity className="w-3 h-3 text-slate-500" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {runs.length === 0 && (
                    <div className="text-center text-slate-400 text-xs py-8">
                        No runs recorded yet.
                    </div>
                )}

                {runs.map((run) => (
                    <div
                        key={run.id}
                        className="p-3 border border-slate-100 rounded-lg hover:border-slate-300 transition-colors bg-white shadow-sm"
                    >
                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center justify-between">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium border ${getStatusColor(run.status)} uppercase tracking-wide`}>
                                    {run.status}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                    {new Date(run.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-xs text-slate-600 font-medium">
                                    Scope: <span className="text-slate-800">{run.scope}</span>
                                </span>
                                <span className="text-[10px] text-slate-400">
                                    {new Date(run.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

