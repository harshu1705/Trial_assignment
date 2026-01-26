"use client";

import { memo } from "react";
import { BaseNode } from "./BaseNode";
import { OutputHandle } from "./OutputHandle";
import { Eye } from "lucide-react";
import { NodeProps } from "@xyflow/react";

export const VisionNode = memo(({ id, data, selected }: NodeProps) => {
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
            id={id}
            icon={<Eye className="w-4 h-4" />}
            title="Vision Node"
            subtitle="Image analysis"
            selected={selected}
            status={data.status}
        >
            <div className="space-y-3">
                <div>
                    <label className="text-xs font-medium text-slate-600">Image URL</label>
                    <input
                        type="text"
                        value={data.imageUrl || ""}
                        onChange={handleImageUrlChange}
                        placeholder="https://example.com/image.jpg"
                        className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <div>
                    <label className="text-xs font-medium text-slate-600">Analysis Prompt (optional)</label>
                    <input
                        type="text"
                        value={data.prompt || "Describe this image"}
                        onChange={handlePromptChange}
                        placeholder="What should the AI analyze?"
                        className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>
            </div>

            <div className="mt-3">
                <OutputHandle label="Description" />
            </div>
        </BaseNode>
    );
});

VisionNode.displayName = "VisionNode";
