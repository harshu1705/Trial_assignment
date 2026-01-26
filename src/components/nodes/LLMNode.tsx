"use client";

import { memo } from "react";
import { BaseNode } from "./BaseNode";
import { OutputHandle } from "./OutputHandle";
import { Sparkles } from "lucide-react";
import { NodeProps } from "@xyflow/react";

export const LLMNode = memo(({ id, data, selected }: NodeProps) => {
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        // Update handled by BaseNode's data.onChange
        if (data.onChange) {
            data.onChange({ prompt: e.target.value });
        }
    };

    return (
        <BaseNode
            id={id}
            icon={<Sparkles className="w-4 h-4" />}
            title="LLM Node"
            subtitle="AI text generation"
            selected={selected}
            status={data.status}
        >
            <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600">Prompt</label>
                <textarea
                    value={data.prompt || ""}
                    onChange={handleTextChange}
                    placeholder="Enter your prompt for AI..."
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                    rows={3}
                />
                <div className="text-[10px] text-slate-400">{(data.prompt || "").length} characters</div>
            </div>

            <div className="mt-3">
                <OutputHandle label="AI Response" />
            </div>
        </BaseNode>
    );
});

LLMNode.displayName = "LLMNode";
