import { Handle, Position } from "@xyflow/react";

interface InputHandleProps {
    id: string;
    label: string;
}

export const InputHandle = ({ id, label }: InputHandleProps) => {
    return (
        <div className="flex items-center space-x-2 relative">
            <Handle
                type="target"
                position={Position.Left}
                id={id}
                className="!w-3 !h-3 !bg-slate-400 !border-2 !border-white hover:!bg-emerald-500 transition-colors"
            />
            <span className="text-xs text-slate-500 font-medium ml-3">
                {label}
            </span>
        </div>
    );
};
