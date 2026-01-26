import { Handle, Position } from "@xyflow/react";

interface OutputHandleProps {
    id: string;
    label: string;
}

export const OutputHandle = ({ id, label }: OutputHandleProps) => {
    return (
        <div className="flex items-center justify-end space-x-2 relative group">
            <span className="text-xs text-slate-500 font-medium mr-3 transition-colors duration-200 group-hover:text-slate-700">
                {label}
            </span>
            <Handle
                type="source"
                position={Position.Right}
                id={id}
                className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white transition-all duration-200 hover:!bg-emerald-500 hover:!scale-125 hover:!border-emerald-200 shadow-sm"
            />
        </div>
    );
};
