import { BaseNode } from "./BaseNode";
import { CaseSensitive } from "lucide-react";
import { NodeProps } from "@xyflow/react";
import { useState, useEffect } from "react";
import { OutputHandle } from "./OutputHandle";
import TextareaAutosize from "react-textarea-autosize";

// Data contract for future execution
interface TextNodeData extends Record<string, unknown> {
    value?: string;
}

export const TextNode = ({ selected, data }: NodeProps) => {
    // Local state for the text value
    // Cast data which is generic to our expected type
    const initialValue = (data?.value as string) || "";
    const [value, setValue] = useState<string>(initialValue);

    // Sync local state to React Flow data (in a real app you'd use a hook or callback)
    useEffect(() => {
        data.value = value;
    }, [value, data]);

    return (
        <BaseNode
            title="Text"
            icon={<CaseSensitive className="w-4 h-4" />}
            selected={selected}
            status={data.status as 'idle' | 'running' | 'completed' | 'error'}
        >
            <div className="flex flex-col space-y-4">
                <div className="relative">
                    <TextareaAutosize
                        minRows={2}
                        maxRows={10}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Enter text input..."
                        className="w-full p-2 text-sm text-slate-700 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none font-mono nodrag transition-colors"
                        readOnly={false} // Future proofing for read-only mode
                    />

                    {/* Character Count Badge */}
                    <div className="absolute bottom-2 right-2 flex items-center justify-end pointer-events-none">
                        <span className="text-[10px] text-slate-400 bg-white/80 px-1 rounded-sm backdrop-blur-sm">
                            {value.length} chars
                        </span>
                    </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    {/* Source Indicator */}
                    <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider pl-1">
                        Source
                    </span>
                    <OutputHandle id="text" label="text" />
                </div>
            </div>
        </BaseNode>
    );
};
