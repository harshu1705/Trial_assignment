import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface BaseNodeProps {
    title: string;
    icon: ReactNode;
    children?: ReactNode;
    selected?: boolean;
}

export const BaseNode = ({ title, icon, children, selected }: BaseNodeProps) => {
    return (
        <div
            className={cn(
                "w-[300px] bg-white rounded-xl shadow-sm border border-slate-200 transition-all duration-200",
                selected && "ring-2 ring-emerald-500 border-emerald-500 shadow-md"
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
