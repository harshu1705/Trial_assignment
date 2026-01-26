import { BaseNode } from "./BaseNode";
import { CaseSensitive } from "lucide-react";
import { NodeProps } from "@xyflow/react";
import { useState } from "react";
import { OutputHandle } from "./OutputHandle";

export const TextNode = ({ selected }: NodeProps) => {
    const [text, setText] = useState("");

    return (
        <BaseNode
            title="Text"
            icon={<CaseSensitive className="w-4 h-4" />}
            selected={selected}
        >
            <div className="flex flex-col space-y-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text..."
                    className="w-full h-24 p-2 text-sm text-slate-700 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none font-mono nodrag"
                />

                <div className="pt-2 border-t border-slate-100">
                    <OutputHandle id="text-out" label="output" />
                </div>
            </div>
        </BaseNode>
    );
};
