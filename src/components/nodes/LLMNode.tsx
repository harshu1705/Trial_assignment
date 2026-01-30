"use client";

import { memo, useState } from "react";
import { BaseNode } from "./BaseNode";
import { OutputHandle } from "./OutputHandle";
import { Sparkles, Maximize2, Minimize2, Image as ImageIcon, FileText } from "lucide-react";
import { NodeProps, Handle, Position, useHandleConnections } from "@xyflow/react";

export const LLMNode = memo(({ id, data, selected }: NodeProps) => {
    // Check connections for various inputs
    const userConnections = useHandleConnections({ type: 'target', id: 'user' });
    const systemConnections = useHandleConnections({ type: 'target', id: 'system' });
    const imageConnections = useHandleConnections({ type: 'target', id: 'images' });

    const isUserConnected = userConnections.length > 0;
    const isSystemConnected = systemConnections.length > 0;
    const isImageConnected = imageConnections.length > 0;

    const [isResponseExpanded, setIsResponseExpanded] = useState(false);

    const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (typeof data.onChange === 'function') {
            data.onChange({ ...data, user_message: e.target.value });
        }
    };

    const handleSystemChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (typeof data.onChange === 'function') {
            data.onChange({ ...data, system_prompt: e.target.value });
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
            <div className="flex flex-col gap-4">

                {/* System Prompt Input */}
                <div className="relative">
                    <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-slate-500">System (Optional)</label>
                        {isSystemConnected && <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 rounded">Connected</span>}
                    </div>
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="system"
                        className={`!w-3 !h-3 !border-2 !border-white transition-colors top-8 -left-4 ${isSystemConnected ? '!bg-emerald-500' : '!bg-slate-300'}`}
                        title="Connect System Prompt"
                    />
                    <textarea
                        value={(data.system_prompt as string) || ""}
                        onChange={handleSystemChange}
                        readOnly={isSystemConnected}
                        placeholder={isSystemConnected ? "Provided by input" : "You are a helpful assistant..."}
                        className={`w-full px-3 py-2 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none ${isSystemConnected
                            ? "bg-slate-50 text-slate-400 border-slate-200"
                            : "bg-white border-slate-200 text-slate-600"
                            }`}
                        rows={2}
                    />
                </div>

                {/* User Message Input */}
                <div className="relative">
                    <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-bold text-slate-700">User Message (Required)</label>
                        <div className="flex gap-1">
                            {isUserConnected && <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 rounded">Text</span>}
                            {isImageConnected && <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 rounded flex items-center gap-0.5"><ImageIcon size={10} /> Image</span>}
                        </div>
                    </div>

                    {/* Handles */}
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="user_message"
                        style={{ top: '60%' }}
                        className={`!w-3 !h-3 !border-2 !border-white transition-colors -left-4 ${isUserConnected ? '!bg-emerald-500' : '!bg-slate-500'}`}
                        title="Connect User Message (Text)"
                    />
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="images" // Multimodal input
                        style={{ top: '85%' }}
                        className={`!w-3 !h-3 !border-2 !border-white transition-colors -left-4 ${isImageConnected ? '!bg-blue-500' : '!bg-slate-300'}`}
                        title="Connect Images (Optional)"
                    />

                    <textarea
                        value={(data.user_message as string) || (data.prompt as string) || ""}
                        onChange={handlePromptChange}
                        readOnly={isUserConnected}
                        placeholder={isUserConnected ? "Provided by input" : "Enter prompt here..."}
                        className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none ${isUserConnected
                            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                            : "bg-white border-slate-200 text-slate-700"
                            }`}
                        rows={3}
                    />
                </div>

                {/* AI Response Panel */}
                {(data.status === 'running' || data.status === 'completed' || data.status === 'error') && (
                    <div className="mt-2 space-y-2">

                        {data.status === 'running' && (
                            <div className="flex items-center space-x-2 text-xs text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-100 animate-pulse">
                                <Sparkles className="w-3 h-3 animate-spin" />
                                <span>Generating response...</span>
                            </div>
                        )}

                        {data.status === 'error' && (
                            <div className="text-xs text-red-600 bg-red-50 p-3 rounded-md border border-red-100">
                                {(data.error as string) || "Generation failed."}
                            </div>
                        )}

                        {data.status === 'completed' && (
                            <div className="mt-1">
                                <div className="flex items-center justify-between mb-1">
                                    <label className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                        <Sparkles size={12} /> AI Response
                                    </label>
                                    {hasResponse && aiResponse.length > 150 && (
                                        <button
                                            onClick={() => setIsResponseExpanded(!isResponseExpanded)}
                                            className="text-[10px] text-blue-600 hover:text-blue-700 flex items-center gap-1 uppercase font-semibold"
                                        >
                                            {isResponseExpanded ? (
                                                <>
                                                    <Minimize2 className="w-3 h-3" /> Less
                                                </>
                                            ) : (
                                                <>
                                                    <Maximize2 className="w-3 h-3" /> More
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>
                                {hasResponse ? (
                                    <textarea
                                        value={aiResponse}
                                        readOnly
                                        className={`w-full rounded-md border border-emerald-200 bg-emerald-50/50 p-3 text-xs text-slate-800 font-medium resize-none focus:outline-none ${isResponseExpanded ? 'min-h-[300px]' : 'min-h-[120px]'
                                            }`}
                                        rows={isResponseExpanded ? 12 : 4}
                                    />
                                ) : (
                                    <div className="mt-1 w-full rounded-md border bg-slate-50 p-3 text-xs text-slate-500 italic">
                                        Response will appear here...
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <div className="mt-3">
                <OutputHandle id="response" label="Response" />
            </div>
        </BaseNode>
    );
});

LLMNode.displayName = "LLMNode";
