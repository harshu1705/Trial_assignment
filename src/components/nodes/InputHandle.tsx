import { Handle, Position } from "@xyflow/react";

interface InputHandleProps {
    id: string;
    label: string;
}

export const InputHandle = ({ id, label }: InputHandleProps) => {
    return (
        <div className="flex items-center space-x-2 relative group">
            <Handle
                type="target"
                position={Position.Left}
                id={id}
                className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white transition-all duration-200 hover:!bg-emerald-500 hover:!scale-125 hover:!border-emerald-200 shadow-sm"
            />
            <span className="text-xs text-slate-500 font-medium ml-3 transition-colors duration-200 group-hover:text-slate-700">
                {label}
            </span>
        </div>
    );
};
