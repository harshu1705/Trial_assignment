import { BaseNode } from "./BaseNode";
import { Bug } from "lucide-react";
import { NodeProps } from "@xyflow/react";
import { InputHandle } from "./InputHandle";
import { OutputHandle } from "./OutputHandle";

export const DebugNode = ({ selected, data }: NodeProps) => {
    return (
        <BaseNode
            title="Debug"
            icon={<Bug className="w-4 h-4" />}
            selected={selected}
            status={data.status as 'idle' | 'running' | 'completed' | 'error'}
        >
            <div className="flex flex-col space-y-4">
                <div className="text-sm text-slate-600">
                    I am a debug node used to verify the BaseNode shell.
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                    <InputHandle id="debug-in" label="Debug Input" />
                    <OutputHandle id="debug-out" label="Debug Output" />
                </div>
            </div>
        </BaseNode>
    );
};
