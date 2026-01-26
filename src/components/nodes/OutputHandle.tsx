import { Handle, Position } from "@xyflow/react";

interface OutputHandleProps {
    id: string;
    label: string;
}

export const OutputHandle = ({ id, label }: OutputHandleProps) => {
    return (
        <div className="flex items-center justify-end space-x-2 relative">
            <span className="text-xs text-slate-500 font-medium mr-3">
                {label}
            </span>
            <Handle
                type="source"
                position={Position.Right}
                id={id}
                className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white hover:!bg-emerald-500 transition-colors"
            />
        </div>
    );
};
