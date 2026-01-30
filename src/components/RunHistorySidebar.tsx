"use client";

import { useEffect, useState } from "react";
import { Clock, Activity, CheckCircle, XCircle, ChevronRight, ChevronDown, ChevronLeft, AlertCircle, Maximize2, Minimize2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

type NodeResult = {
    duration: number; // in seconds
    status: 'success' | 'failed' | 'running';
    output?: any;
    error?: string;
    _meta?: any;
};

type Run = {
    id: string;
    createdAt: string;
    status: string;
    scope: string; // 'full' | 'single' | 'partial'
    payload?: {
        results?: Record<string, NodeResult>;
        llmResponse?: any; // legacy field, but might exist
        scope?: string;
    };
};

const ExpandableOutput = ({ content }: { content: string }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = content.length > 80 || content.includes('\n');

    return (
        <div className="w-full">
            <div className={cn(
                "whitespace-pre-wrap break-all text-[10px] font-mono leading-relaxed",
                !expanded && "line-clamp-3"
            )}>
                {content}
            </div>
            {isLong && (
                <button
                    onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
                    className="flex items-center space-x-1 mt-2 text-[9px] text-indigo-500 hover:text-indigo-600 font-medium bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded transition-colors w-full justify-center border border-indigo-100"
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
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchRuns = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/workflows/default/runs", { cache: 'no-store' });
            if (res.ok) {
                const data = await res.json();
                console.log("Fetched Runs:", data.runs);
                setRuns(data.runs || []);
            } else {
                console.error("Failed to fetch runs:", res.status);
            }
        } catch (error) {
            console.error("Failed to fetch runs", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRuns();
        const interval = setInterval(fetchRuns, 4000); // Auto refresh every 4s
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
        else if (diffMins < 60) relative = `${diffMins}m ago`;
        else if (diffMins < 1440) relative = `${Math.floor(diffMins / 60)}h ago`;
        else relative = `${Math.floor(diffMins / 1440)}d ago`;

        const absolute = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        return `${relative} · ${absolute}`;
    };

    const formatDuration = (ms?: number) => {
        if (ms === undefined || ms === null) return '-';
        if (ms < 1000) return `${ms}ms`;
        return `${(ms / 1000).toFixed(2)}s`;
    };

    const getStatusDotColor = (status?: string) => {
        if (!status) return 'bg-slate-300 border-slate-400';
        switch (status.toLowerCase()) {
            case 'success': case 'completed': return 'bg-emerald-500 border-emerald-600';
            case 'failed': case 'error': return 'bg-red-500 border-red-600';
            case 'running': return 'bg-blue-500 border-blue-600';
            default: return 'bg-slate-300 border-slate-400';
        }
    };

    const getStatusBadgeStyles = (status?: string) => {
        if (!status) return 'bg-slate-100 text-slate-700 border-slate-200';
        switch (status.toLowerCase()) {
            case 'success':
            case 'completed':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200 ring-1 ring-emerald-50';
            case 'failed':
            case 'failure':
                return 'bg-red-100 text-red-700 border-red-200 ring-1 ring-red-50';
            case 'running':
                return 'bg-blue-100 text-blue-700 border-blue-200 animate-pulse';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getScopeStyles = (scope?: string) => {
        const s = scope?.toLowerCase() || 'unknown';
        if (s === 'full') return 'text-blue-600 bg-blue-50 border-blue-100';
        if (s === 'single') return 'text-slate-600 bg-slate-50 border-slate-100';
        return 'text-slate-500 bg-slate-50 border-slate-100';
    };

    return (
        <div className={cn(
            "border-l border-slate-200 bg-white flex flex-col h-full flex-shrink-0 relative transition-all duration-300 ease-in-out z-20 shadow-lg",
            isCollapsed ? "w-0 border-0" : "w-80"
        )}>
            {/* Collapse/Expand Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={cn(
                    "absolute top-1/2 -left-3 z-50 bg-white border border-slate-200 shadow-md hover:bg-slate-50 transition-all duration-200 p-1 rounded-full",
                    isCollapsed ? "translate-x-full left-0 opacity-50 hover:opacity-100" : ""
                )}
                title={isCollapsed ? "Show Runs" : "Hide Runs"}
            >
                {isCollapsed ? (
                    <ChevronLeft className="w-3 h-3 text-slate-600" />
                ) : (
                    <ChevronRight className="w-3 h-3 text-slate-600" />
                )}
            </button>

            {/* Sidebar Content */}
            <div className={cn(
                "flex flex-col h-full transition-opacity duration-300 overflow-hidden",
                isCollapsed ? "opacity-0 pointer-events-none" : "opacity-100"
            )}>
                {/* Header */}
                <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 text-slate-700">
                        <Clock className="w-4 h-4 text-slate-500" />
                        <span className="font-semibold text-sm">Run History</span>
                    </div>
                    <button
                        onClick={fetchRuns}
                        className={cn("p-1.5 hover:bg-slate-200 rounded-md transition-colors", isLoading && "animate-spin text-indigo-500")}
                        title="Refresh"
                    >
                        <Activity className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50/30">
                    {runs.length === 0 && !isLoading && (
                        <div className="flex flex-col items-center justify-center h-40 text-center text-slate-400 space-y-2">
                            <Clock className="w-8 h-8 opacity-20" />
                            <p className="text-xs">No runs recorded yet.</p>
                            <button onClick={fetchRuns} className="text-xs text-indigo-500 hover:underline">
                                Try Refreshing
                            </button>
                        </div>
                    )}

                    {runs.map((run) => {
                        // Determine actual scope from payload if available
                        const displayScope = run.payload?.scope || run.scope;

                        return (
                            <div
                                key={run.id}
                                className={cn(
                                    "border rounded-lg transition-all duration-200 bg-white group",
                                    expandedRunId === run.id
                                        ? 'border-indigo-300 shadow-md ring-1 ring-indigo-100/50'
                                        : 'border-slate-200 hover:border-indigo-300 hover:shadow-sm'
                                )}
                            >
                                {/* Run Header */}
                                <div
                                    className="p-3 cursor-pointer select-none"
                                    onClick={() => toggleRun(run.id)}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <span className={cn(
                                                "text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide",
                                                getStatusBadgeStyles(run.status)
                                            )}>
                                                {run.status}
                                            </span>
                                            <span className={cn(
                                                "text-[9px] px-1.5 py-0.5 rounded border font-medium uppercase tracking-wider",
                                                getScopeStyles(displayScope)
                                            )}>
                                                {displayScope}
                                            </span>
                                        </div>
                                        {expandedRunId === run.id ? (
                                            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                                        ) : (
                                            <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span className="font-mono text-[10px] opacity-80">
                                            {formatTimestamp(run.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* Run Details (Expanded) */}
                                {expandedRunId === run.id && (
                                    <div className="border-t border-slate-100 bg-slate-50/50 p-3 animate-in slide-in-from-top-1 duration-200">
                                        <div className="space-y-4 relative pl-2">
                                            {/* Timeline Line */}
                                            <div className="absolute left-[7px] top-2 bottom-6 w-0.5 bg-slate-200/60 z-0"></div>

                                            {/* Iterate over nodes */}
                                            {run.payload?.results && Object.keys(run.payload.results).length > 0 ? (
                                                Object.entries(run.payload.results).map(([nodeId, result], index) => (
                                                    <div key={nodeId} className="relative z-10 group/node">
                                                        <div className="flex items-start">
                                                            {/* Timeline Dot */}
                                                            <div className="mr-3 mt-2 shrink-0 relative z-10">
                                                                <div className={cn(
                                                                    "w-3 h-3 rounded-full border-2 border-white ring-1 shadow-sm box-content",
                                                                    getStatusDotColor(result.status)
                                                                )} />
                                                            </div>

                                                            {/* Node Content Card */}
                                                            <div className="flex-1 min-w-0 bg-white border border-slate-200 rounded-lg p-2.5 shadow-sm hover:border-slate-300 transition-all">
                                                                <div className="flex items-center justify-between mb-1">
                                                                    <span className={cn(
                                                                        "font-semibold text-xs truncate",
                                                                        result.status === 'failed' ? "text-red-700" : "text-slate-800"
                                                                    )}>
                                                                        {/* @ts-ignore */}
                                                                        {result._meta?.label || result._meta?.type || nodeId}
                                                                    </span>
                                                                    {/* @ts-ignore */}
                                                                    <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-1.5 rounded">{formatDuration(result._meta?.duration)}</span>
                                                                </div>

                                                                {/* Inputs */}
                                                                {/* @ts-ignore */}
                                                                {result._meta?.inputs && (
                                                                    <div className="mt-2 text-xs">
                                                                        <span className="text-[9px] uppercase font-bold text-slate-400 mb-0.5 block">Input</span>
                                                                        <div className="bg-slate-50 rounded border border-slate-100 p-1.5 text-slate-600 font-mono text-[10px]">
                                                                            {/* @ts-ignore */}
                                                                            <ExpandableOutput content={JSON.stringify(result._meta.inputs, null, 2)} />
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Output */}
                                                                {result.output && (
                                                                    <div className="mt-2 text-xs">
                                                                        <span className="text-[9px] uppercase font-bold text-slate-400 mb-0.5 block">Output</span>
                                                                        <div className="bg-emerald-50/50 rounded border border-emerald-100/50 p-1.5 text-slate-700 font-mono text-[10px]">
                                                                            <ExpandableOutput content={typeof result.output === 'string' ? result.output : JSON.stringify(result.output, null, 2)} />
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {/* Error */}
                                                                {result.error && (
                                                                    <div className="mt-2 text-[10px] text-red-600 bg-red-50 p-2 rounded border border-red-100 flex items-start gap-1">
                                                                        <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                                                                        <span className="break-all">{result.error}</span>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-2 text-xs text-slate-400 italic">
                                                    No details available.
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
