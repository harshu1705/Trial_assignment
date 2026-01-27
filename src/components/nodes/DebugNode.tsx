import { BaseNode } from "./BaseNode";
import { Bug } from "lucide-react";
import { NodeProps } from "@xyflow/react";
import { InputHandle } from "./InputHandle";
import { OutputHandle } from "./OutputHandle";

export const DebugNode = ({ selected, data }: NodeProps) => {
    // Filter out internal react flow data for cleaner debug view
    const displayData = Object.entries(data).reduce((acc, [key, value]) => {
        if (!['label', 'status', 'icon'].includes(key)) {
            acc[key] = value;
        }
        return acc;
    }, {} as Record<string, unknown>);

    return (
        <BaseNode
            title="Debug"
            icon={<Bug className="w-4 h-4" />}
            selected={selected}
            status={data.status as 'idle' | 'running' | 'completed' | 'error'}
        >
            <div className="flex flex-col space-y-4">
                <div className="text-sm text-slate-600">
                    <div className="bg-slate-900 text-green-400 p-3 rounded-md font-mono text-xs overflow-x-auto max-h-[200px] overflow-y-auto">
                        {Object.keys(displayData).length > 0 ? (
                            <pre>{JSON.stringify(displayData, null, 2)}</pre>
                        ) : (
                            <span className="opacity-50">// Waiting for data...</span>
                        )}
                    </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                    <InputHandle id="debug-in" label="Debug Input" />
                    <OutputHandle id="debug-out" label="Debug Output" />
                </div>
            </div>
        </BaseNode>
    );
};
