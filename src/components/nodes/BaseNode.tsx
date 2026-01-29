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
                "w-[280px] min-w-[280px] max-w-[280px] flex-none bg-white rounded-xl shadow-sm border border-slate-200 transition-all duration-200 box-border",
                "hover:border-slate-300 hover:shadow-md",
                selected && "ring-2 ring-emerald-500 border-emerald-500 shadow-md ring-offset-2",

                // Status styles
                status === 'running' && "ring-2 ring-amber-400 border-amber-400 shadow-lg ring-offset-2",
                status === 'completed' && "ring-2 ring-blue-500 border-blue-500 shadow-md ring-offset-2",
                status === 'error' && "ring-2 ring-red-500 border-red-500 shadow-md ring-offset-2",
            )}
        >
            {/* Header */}
            <div className="flex items-center px-4 py-3 border-b border-slate-100 bg-slate-50/50 rounded-t-xl">
                <div className="text-slate-500 mr-2">
                    {icon}
                </div>
                <div className="font-semibold text-slate-700 text-sm">
                    {title}
                </div>
            </div>

            {/* Body */}
            <div className="p-4">
                {children}
            </div>

            {/* Footer (Reserved) */}
            {/* Footer (Reserved) */}
            <div className="h-9 border-t border-slate-100 bg-slate-50/30 rounded-b-xl flex items-center px-4 text-xs text-slate-500 font-medium">
                {/* Reserved for Execution State */}
            </div>
        </div>
    );
};
