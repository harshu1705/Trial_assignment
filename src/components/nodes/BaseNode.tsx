import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BaseNodeProps {
    title: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    selected?: boolean;
    status?: 'idle' | 'running' | 'completed' | 'error';
}

export const BaseNode = ({ title, icon, children, selected, status = 'idle' }: BaseNodeProps) => {
    return (
        <div
            className={cn(
                "w-[280px] min-w-[280px] max-w-[280px] h-auto flex-none bg-white rounded-xl shadow-sm border border-slate-200 transition-all duration-200",
                "hover:border-slate-300 hover:shadow-md",
                selected && "ring-2 ring-emerald-500 border-emerald-500 shadow-md ring-offset-2",

                // Status styles with animations
                status === 'running' && "node-running",
                status === 'completed' && "node-success",
                status === 'error' && "node-error",
                status === 'idle' && "node-idle",
            )}
            style={{
                // Force strict sizing to prevent expansion
                maxHeight: '400px',
                overflow: 'hidden'
            }}
        >
            {/* Header */}
            <div className="flex items-center px-4 py-3 border-b border-slate-100 bg-slate-50/50 rounded-t-xl shrink-0">
                <div className="text-slate-500 mr-2">
                    {icon}
                </div>
                <div className="font-semibold text-slate-700 text-sm">
                    {title}
                </div>
            </div>

            {/* Body */}
            <div className="p-4 overflow-auto" style={{ maxHeight: '280px' }}>
                {children}
            </div>

            {/* Footer */}
            <div className="h-9 border-t border-slate-100 bg-slate-50/30 rounded-b-xl flex items-center px-4 text-xs text-slate-500 font-medium shrink-0">
                {/* Reserved for Execution State */}
            </div>
        </div>
    );
};
