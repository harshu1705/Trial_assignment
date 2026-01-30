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

    const formatDuration = (ms?: number) => {
        if (ms === undefined || ms === null) return '-';
        if (ms < 1000) return `${ms}ms`;
        return `${(ms / 1000).toFixed(2)}s`;
    };

    const getDurationColor = (ms?: number, status?: string) => {
        if (status === 'failed') return 'text-red-600 bg-red-50 border-red-100';
        if (ms === undefined || ms === null) return 'text-slate-500 bg-slate-100 border-slate-200';
        if (ms < 100) return 'text-emerald-600 bg-emerald-50 border-emerald-100'; // Green
        if (ms < 2000) return 'text-amber-600 bg-amber-50 border-amber-100'; // Yellow
        return 'text-red-600 bg-red-50 border-red-100'; // Red
    };

    const getStatusDotColor = (status?: string) => {
        if (!status) return 'bg-slate-300';
        switch (status.toLowerCase()) {
            case 'success': return 'bg-emerald-500';
            case 'failed': return 'bg-red-500';
            case 'running': return 'bg-blue-500';
            default: return 'bg-slate-300';
        }
    };

    const getStatusBadgeStyles = (status?: string) => {
        if (!status) return 'bg-slate-100 text-slate-700 border-slate-200';
        switch (status.toLowerCase()) {
            case 'success':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'failed':
            case 'failure':
                return 'bg-red-100 text-red-700 border-red-200';
            case 'partial':
                return 'bg-amber-100 text-amber-700 border-amber-200 ring-1 ring-amber-50';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getScopeStyles = (scope?: string) => {
        if (!scope) return 'text-slate-500 bg-slate-50 border-slate-100';
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
                            <div className="border-t border-slate-100 bg-slate-50/50 p-4 animate-in slide-in-from-top-1 duration-200">
                                <div className="space-y-0 relative">
                                    {/* Vertical Timeline Line */}
                                    <div className="absolute left-[7px] top-2 bottom-6 w-0.5 bg-slate-200 z-0"></div>

                                    {/* Iterate over nodes */}
                                    {run.payload?.results && Object.keys(run.payload.results).length > 0 ? (
                                        Object.entries(run.payload.results).map(([nodeId, result], index) => (
                                            <div key={nodeId} className="relative z-10 pb-6 last:pb-0 group">
                                                <div className="flex items-start pl-0">
                                                    {/* Timeline Dot */}
                                                    <div className="relative z-10 mr-3 mt-1.5">
                                                        <div className={cn(
                                                            "w-4 h-4 rounded-full border-2 border-white ring-1 ring-slate-100 shadow-sm flex items-center justify-center",
                                                            getStatusDotColor(result.status)
                                                        )}>
                                                            {result.status === 'failed' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                                                        </div>
                                                    </div>

                                                    {/* Node Content Card */}
                                                    <div className={cn(
                                                        "flex-1 min-w-0 bg-white border rounded-lg p-3 shadow-sm transition-all duration-200",
                                                        result.status === 'failed' ? "border-red-200 ring-1 ring-red-50" :
                                                            result.status === 'running' ? "border-blue-200 ring-1 ring-blue-50" :
                                                                "border-slate-200 hover:border-indigo-200 hover:shadow-md"
                                                    )}>
                                                        <div className="flex items-center justify-between mb-2">
                                                            <div className="flex flex-col truncate pr-2">
                                                                {/* Node Name */}
                                                                <span className={cn(
                                                                    "font-semibold text-sm truncate",
                                                                    result.status === 'failed' ? "text-red-700" : "text-slate-800"
                                                                )}>
                                                                    {/* @ts-ignore - dynamic data */}
                                                                    {result._meta?.label || (result._meta?.type ? result._meta.type.replace(/([A-Z])/g, ' $1').trim() : 'Node')}
                                                                </span>
                                                                {/* Node ID */}
                                                                <span className="text-[10px] text-slate-400 font-mono tracking-tight">
                                                                    ID: {nodeId.substring(0, 8)}...
                                                                </span>
                                                            </div>
                                                            {/* Duration Badge - Neutral unless failed, purely informational */}
                                                            {/* @ts-ignore - dynamic data */}
                                                            <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full border bg-slate-50 text-slate-500 border-slate-100">
                                                                {/* @ts-ignore - dynamic data */}
                                                                {formatDuration(result._meta?.duration)}
                                                            </span>
                                                        </div>

                                                        {/* Input Preview */}
                                                        {/* @ts-ignore - dynamic data */}
                                                        {result._meta?.inputs && Object.keys(result._meta.inputs).length > 0 && (
                                                            <div className="mt-3">
                                                                <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 mb-1 block">Input</span>
                                                                <div className="font-mono text-[10px] bg-slate-50 rounded border border-slate-100 p-2 text-slate-600">
                                                                    {/* @ts-ignore - dynamic data */}
                                                                    <ExpandableOutput content={JSON.stringify(result._meta.inputs, null, 2)} />
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Output Preview */}
                                                        {result.output && (
                                                            <div className="mt-3">
                                                                <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 mb-1 block">Output</span>
                                                                <div className="font-mono text-[10px] bg-slate-50 rounded border border-slate-100 p-2 text-slate-600">
                                                                    <ExpandableOutput content={typeof result.output === 'string' ? result.output : JSON.stringify(result.output, null, 2)} />
                                                                </div>
                                                            </div>
                                                        )}

                                                        {/* Error Message */}
                                                        {result.error && (
                                                            <div className="mt-3">
                                                                <div className="text-[11px] text-red-600 bg-red-50 p-2 rounded border border-red-100 font-medium break-words flex items-start gap-1.5">
                                                                    <AlertCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                                                    <span>{result.error}</span>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-4 text-xs text-slate-400 italic">
                                            No execution details available
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
