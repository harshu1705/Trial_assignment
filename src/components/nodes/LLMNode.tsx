"use client";

import { memo, useState } from "react";
import { BaseNode } from "./BaseNode";
import { OutputHandle } from "./OutputHandle";
import { Sparkles, Maximize2, Minimize2 } from "lucide-react";
import { NodeProps, Handle, Position, useHandleConnections } from "@xyflow/react";

export const LLMNode = memo(({ id, data, selected }: NodeProps) => {
    const connections = useHandleConnections({ type: 'target', id: 'text-prompt' });
    const isConnected = connections.length > 0;
    const [isResponseExpanded, setIsResponseExpanded] = useState(false);

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (typeof data.onChange === 'function') {
            data.onChange({ ...data, prompt: e.target.value });
        }
    };

    // Get the AI response from data.output
    const aiResponse = (data.output as string) || "";
    const hasResponse = aiResponse.length > 0;

    return (
        <BaseNode
            icon={<Sparkles className="w-4 h-4" />}
            title="LLM Node"
            selected={selected}
            status={data.status as 'idle' | 'running' | 'completed' | 'error'}
        >
            <Handle
                type="target"
                position={Position.Left}
                className="!bg-slate-500 !w-3 !h-3 !border-2 !border-white hover:!bg-emerald-500 transition-colors"
                id="text-prompt"
                title="Connect Text Prompt"
            />
            <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600">Prompt Source</label>
                <textarea
                    value={(data.prompt as string) || ""}
                    onChange={handlePromptChange}
                    readOnly={isConnected}
                    placeholder={isConnected ? "Provided by connection" : "Enter prompt here..."}
                    className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${isConnected
                        ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                        : "bg-white border-slate-200 text-slate-700"
                        }`}
                    rows={3}
                />
            </div>

            {/* AI Response Panel */}
            {(data.status === 'running' || data.status === 'completed' || data.status === 'error') && (
                <div className="mt-4 space-y-2">

                    {data.status === 'running' && (
                        <>
                            <label className="text-xs font-medium text-slate-600">AI Response</label>
                            <div className="flex items-center space-x-2 text-xs text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-100 animate-pulse">
                                <Sparkles className="w-3 h-3 animate-spin" />
                                <span>Generating response...</span>
                            </div>
                        </>
                    )}

                    {data.status === 'error' && (
                        <div className="text-xs text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                            {(data.error as string) || "Generation failed. Please check inputs and try again."}
                        </div>
                    )}

                    {data.status === 'completed' && (
                        <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                                <label className="text-xs font-medium text-emerald-600">
                                    ✓ AI Response
                                </label>
                                {hasResponse && aiResponse.length > 150 && (
                                    <button
                                        onClick={() => setIsResponseExpanded(!isResponseExpanded)}
                                        className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                                    >
                                        {isResponseExpanded ? (
                                            <>
                                                <Minimize2 className="w-3 h-3" />
                                                Show Less
                                            </>
                                        ) : (
                                            <>
                                                <Maximize2 className="w-3 h-3" />
                                                Expand
                                            </>
                                        )}
                                    </button>
                                )}
                            </div>
                            {hasResponse ? (
                                <textarea
                                    value={aiResponse}
                                    readOnly
                                    className={`w-full rounded-md border border-emerald-200 bg-emerald-50 p-3 text-xs text-slate-700 font-mono resize-none focus:outline-none ${isResponseExpanded ? 'max-h-[300px]' : 'max-h-[120px]'
                                        }`}
                                    rows={isResponseExpanded ? 12 : 4}
                                />
                            ) : (
                                <div className="mt-1 w-full rounded-md border bg-slate-50 p-3 text-xs text-slate-500 italic">
                                    Response will appear here after execution
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="mt-3">
                <OutputHandle id="text-response" label="AI Response" />
            </div>
        </BaseNode>
    );
});

LLMNode.displayName = "LLMNode";

