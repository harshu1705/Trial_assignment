"use client";

import { memo } from "react";
import { BaseNode } from "./BaseNode";
import { OutputHandle } from "./OutputHandle";
import { Sparkles } from "lucide-react";
import { NodeProps, Handle, Position } from "@xyflow/react";

export const LLMNode = memo(({ id, data, selected }: NodeProps) => {
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
                id="prompt-input"
            />
            <div className="space-y-2">
                <label className="text-xs font-medium text-slate-600">Prompt Source</label>
                <textarea
                    value={(data.prompt as string) || (data.text as string) || ""}
                    readOnly
                    placeholder="Connect a Text node to provide input prompt..."
                    className="w-full px-3 py-2 text-sm border border-slate-200 bg-slate-50 text-slate-500 rounded-md focus:outline-none resize-none cursor-not-allowed"
                    rows={3}
                />
            </div>

            <div className="mt-3">
                <OutputHandle id="response" label="AI Response" />
            </div>
        </BaseNode>
    );
});

LLMNode.displayName = "LLMNode";
