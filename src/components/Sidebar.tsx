"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Settings, Sparkles } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
        color: "text-violet-500",
    },
];

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white border-r border-zinc-800/50 shadow-xl">
            <div className="px-3 py-2 flex-1">
                {/* Modern Branding */}
                <Link href="/dashboard" className="flex items-center pl-3 mb-12 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                        <Sparkles className="h-7 w-7 text-white relative z-10" />
                    </div>
                    <div className="ml-3">
                        <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                            Galaxy.ai
                        </h1>
                        <p className="text-[10px] text-zinc-500 font-medium">AI Workflows</p>
                    </div>
                </Link>

                {/* Navigation */}
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200",
                                pathname === route.href ? "text-white bg-white/10 shadow-lg" : "text-zinc-400"
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3 transition-transform group-hover:scale-110", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* User Section */}
            <div className="px-3 py-2 border-t border-zinc-800/50">
                <div className="flex items-center pl-3 mb-4 gap-x-3 group cursor-pointer">
                    <UserButton />
                    <div className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        Account
                    </div>
                </div>
            </div>
        </div>
    );
};
