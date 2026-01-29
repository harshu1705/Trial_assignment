"use client";

import { memo } from "react";
import { BaseNode } from "./BaseNode";
import { OutputHandle } from "./OutputHandle";
import { Eye } from "lucide-react";
import { NodeProps, Handle, Position, useHandleConnections } from "@xyflow/react";

export const VisionNode = memo(({ id, data, selected }: NodeProps) => {
    // Check connections to disable inputs
    const imageConnections = useHandleConnections({ type: 'target', id: 'image-url' });
    const promptConnections = useHandleConnections({ type: 'target', id: 'text-prompt' });

    const isImageConnected = imageConnections.length > 0;
    const isPromptConnected = promptConnections.length > 0;

    const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (data.onChange) {
            data.onChange({ imageUrl: e.target.value });
        }
    };

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (data.onChange) {
            data.onChange({ ...data, prompt: e.target.value });
        }
    };

    return (
        <BaseNode
            icon={<Eye className="w-4 h-4" />}
            title="Vision Node"
            selected={selected}
            status={data.status as 'idle' | 'running' | 'completed' | 'error'}
        >
            <div className="space-y-4">
                <div className="relative">
                    {/* Image Handle */}
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="image-url"
                        className="!bg-purple-500 !w-3 !h-3 !border-2 !border-white hover:!bg-purple-600 transition-colors top-8"
                        title="Connect Image Output"
                    />
                    <label className="text-xs font-medium text-slate-600">Image URL</label>
                    <input
                        type="text"
                        value={data.imageUrl as string || ""}
                        onChange={handleImageUrlChange}
                        placeholder={isImageConnected ? "Provided by connection" : "https://example.com/image.jpg"}
                        disabled={isImageConnected}
                        className={`w-full mt-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${isImageConnected
                            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                            : "bg-white border-slate-200"
                            }`}
                    />
                </div>

                <div className="relative">
                    {/* Prompt Handle */}
                    <Handle
                        type="target"
                        position={Position.Left}
                        id="text-prompt"
                        className="!bg-slate-500 !w-3 !h-3 !border-2 !border-white hover:!bg-emerald-500 transition-colors top-8"
                        title="Connect Text Prompt"
                    />
                    <label className="text-xs font-medium text-slate-600">Analysis Prompt</label>
                    <input
                        type="text"
                        value={data.prompt as string || "Describe this image"}
                        onChange={handlePromptChange}
                        placeholder={isPromptConnected ? "Provided by connection" : "What should the AI analyze?"}
                        disabled={isPromptConnected}
                        className={`w-full mt-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 ${isPromptConnected
                            ? "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                            : "bg-white border-slate-200"
                            }`}
                    />
                </div>
            </div>

            <div className="mt-3">
                <OutputHandle id="text-description" label="Description" />
            </div>
        </BaseNode>
    );
});

VisionNode.displayName = "VisionNode";
