"use client";

import { useEffect, useState } from "react";
import { Clock, Activity, CheckCircle, XCircle, ChevronRight, ChevronDown, AlertCircle, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

type NodeResult = {
    duration: number; // in seconds
    status: 'success' | 'failed' | 'running';
    output?: any;
    error?: string;
};

type Run = {
    id: string;
    createdAt: string;
    status: string;
    scope: string;
    payload?: {
        results?: Record<string, NodeResult>;
        llmResponse?: any; // legacy field, but might exist
    };
};

const ExpandableOutput = ({ content }: { content: string }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = content.length > 100 || content.includes('\n');

    return (
        <div className="w-full">
            <div className={cn(
                "whitespace-pre-wrap break-all text-[10px]",
                !expanded && "line-clamp-3"
            )}>
                {content}
            </div>
            {isLong && (
                <button
                    onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                    className="flex items-center space-x-1 mt-1 text-[9px] text-indigo-500 hover:text-indigo-600 font-medium bg-indigo-50 px-1.5 py-0.5 rounded transition-colors w-fit"
                >
                    {expanded ? (
                        <>
                            <Minimize2 className="w-3 h-3" />
                            <span>Show Less</span>
                        </>
                    ) : (
                        <>
                            <Maximize2 className="w-3 h-3" />
                            <span>Show Full Output</span>
                        </>
                    )}
                </button>
            )}
        </div>
    );
};

export const RunHistorySidebar = () => {
    const [runs, setRuns] = useState<Run[]>([]);
    const [expandedRunId, setExpandedRunId] = useState<string | null>(null);

    const fetchRuns = async () => {
        try {
            const res = await fetch("/api/workflows/default/runs");
            if (res.ok) {
                const data = await res.json();
                setRuns(data.runs);
            }
        } catch (error) {
            console.error("Failed to fetch runs", error);
        }
    };

    useEffect(() => {
        fetchRuns();
        const interval = setInterval(fetchRuns, 5000);
        return () => clearInterval(interval);
    }, []);

    const toggleRun = (runId: string) => {
        setExpandedRunId(expandedRunId === runId ? null : runId);
    };

    const formatTimestamp = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        let relative = "";
        if (diffMins < 1) relative = "Just now";
        else if (diffMins < 60) relative = `${diffMins} mins ago`;
        else if (diffMins < 1440) relative = `${Math.floor(diffMins / 60)}h ago`;
        else relative = `${Math.floor(diffMins / 1440)}d ago`;

        const absolute = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${relative} · ${absolute}`;
    };

    const getStatusBadgeStyles = (status: string) => {
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

    const getScopeStyles = (scope: string) => {
        switch (scope.toLowerCase()) {
            case 'full':
                return 'text-blue-600 bg-blue-50 border-blue-100';
            case 'partial':
                return 'text-amber-600 bg-amber-50 border-amber-100';
            case 'single':
                return 'text-slate-600 bg-slate-50 border-slate-100';
            default:
                return 'text-slate-500 bg-slate-50 border-slate-100';
        }
    };

    return (
        <div className="w-80 border-l border-slate-200 bg-white flex flex-col h-full flex-shrink-0">
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
                        className={cn(
                            "border rounded-lg transition-all duration-200 bg-white",
                            expandedRunId === run.id ? 'border-indigo-200 shadow-sm ring-1 ring-indigo-50' : 'border-slate-100 hover:border-slate-300'
                        )}
                    >
                        {/* Run Header */}
                        <div
                            className="p-3 cursor-pointer select-none"
                            onClick={() => toggleRun(run.id)}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className={cn(
                                    "text-[10px] px-2 py-0.5 rounded-full font-semibold border uppercase tracking-wide",
                                    getStatusBadgeStyles(run.status)
                                )}>
                                    {run.status}
                                </span>
                                <span className="text-[10px] text-slate-400 font-mono">
                                    {formatTimestamp(run.createdAt)}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className={cn(
                                    "text-[10px] px-1.5 py-0.5 rounded border font-medium",
                                    getScopeStyles(run.scope)
                                )}>
                                    {run.scope}
                                </span>
                                {expandedRunId === run.id ? (
                                    <ChevronDown className="w-3 h-3 text-slate-400" />
                                ) : (
                                    <ChevronRight className="w-3 h-3 text-slate-400" />
                                )}
                            </div>
                        </div>

                        {/* Run Details (Expanded) */}
                        {expandedRunId === run.id && (
                            <div className="border-t border-slate-100 bg-slate-50/50 p-2 animate-in slide-in-from-top-1 duration-200">
                                <div className="space-y-2">
                                    {/* Iterate over nodes */}
                                    {run.payload?.results && Object.keys(run.payload.results).length > 0 ? (
                                        Object.entries(run.payload.results).map(([nodeId, result]) => (
                                            <div key={nodeId} className="flex flex-col text-xs bg-white border border-slate-100 rounded-md p-2 shadow-sm">
                                                <div className="flex items-center justify-between mb-1">
                                                    <div className="flex items-center space-x-1.5">
                                                        {result.status === 'success' && <CheckCircle className="w-3 h-3 text-emerald-500" />}
                                                        {result.status === 'failed' && <XCircle className="w-3 h-3 text-red-500" />}
                                                        {result.status === 'running' && <Activity className="w-3 h-3 text-blue-500 animate-pulse" />}
                                                        <span className="font-medium text-slate-700">{nodeId}</span>
                                                    </div>
                                                    <span className="text-[10px] text-slate-400">
                                                        {result.duration ? `${result.duration}s` : '-'}
                                                    </span>
                                                </div>

                                                {/* Output Preview */}
                                                {result.output && (
                                                    <div className="mt-1 pl-4 border-l-2 border-slate-100">
                                                        <div className="text-[10px] text-slate-500">
                                                            <div className="font-mono bg-slate-50 rounded p-1.5 border border-slate-100">
                                                                <ExpandableOutput content={typeof result.output === 'string' ? result.output : JSON.stringify(result.output, null, 2)} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Error Message */}
                                                {result.error && (
                                                    <div className="mt-1 pl-4 border-l-2 border-red-100">
                                                        <div className="text-[10px] text-red-600 font-medium break-words">
                                                            {result.error}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-2 text-xs text-slate-400 italic">
                                            No node details available
                                        </div>
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
