"use client";

import { useEffect, useState } from "react";
import { Clock, CheckCircle, XCircle, ChevronRight, ChevronDown, Activity } from "lucide-react";

type Run = {
    id: string;
    createdAt: string;
    status: string;
    scope: string;
    payload: any;
};

export const RunHistorySidebar = () => {
    const [runs, setRuns] = useState<Run[]>([]);
    const [expandedRunId, setExpandedRunId] = useState<string | null>(null);

    const fetchRuns = async () => {
        try {
            const res = await fetch("/api/runs");
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

    const toggleRun = (runId: string) => {
        setExpandedRunId(expandedRunId === runId ? null : runId);
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
                        className={`border rounded-lg text-sm transition-all duration-200 ${expandedRunId === run.id ? 'border-indigo-200 shadow-sm bg-indigo-50/30' : 'border-slate-100 hover:border-slate-300'
                            }`}
                    >
                        {/* Run Header */}
                        <div
                            className="p-3 cursor-pointer flex items-center justify-between"
                            onClick={() => toggleRun(run.id)}
                        >
                            <div className="flex items-center space-x-3">
                                {run.status === "success" ? (
                                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                                ) : (
                                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                                )}
                                <div>
                                    <div className="font-medium text-slate-700">
                                        {new Date(run.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                                        {run.scope} • {run.status}
                                    </div>
                                </div>
                            </div>
                            {expandedRunId === run.id ? (
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                        </div>

                        {/* Run Details (Expanded) */}
                        {expandedRunId === run.id && (
                            <div className="border-t border-slate-100 bg-white/50 p-3 space-y-2 animate-in slide-in-from-top-1 duration-200">
                                {run.payload?.llmResponse && (
                                    <div className="bg-slate-50 border border-slate-100 rounded p-2">
                                        <div className="text-[10px] font-bold text-indigo-600 mb-1">AI OUTPUT</div>
                                        <div className="text-xs text-slate-600 line-clamp-3">
                                            {run.payload.llmResponse.text}
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-1">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase">Node Execution</div>
                                    {run.payload?.results ? (
                                        Object.entries(run.payload.results).map(([nodeId, result]: [string, any]) => (
                                            <div key={nodeId} className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0">
                                                <span className="text-slate-600 font-mono truncate max-w-[100px]">{nodeId}</span>
                                                <span className="text-emerald-600 font-medium">Completed</span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-xs text-slate-400 italic">No node results</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};
