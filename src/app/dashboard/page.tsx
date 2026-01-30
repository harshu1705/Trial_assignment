import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Canvas } from "@/components/Canvas";
import { NodesSidebar } from "@/components/NodesSidebar";
import { RunHistorySidebar } from "@/components/RunHistorySidebar";
import { WorkflowToolbar } from "@/components/WorkflowToolbar";

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const user = await currentUser();

    return (
        <div className="h-full flex flex-col">
            {/* Compact Top Bar */}
            <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white/80 backdrop-blur-sm shrink-0">
                <h1 className="text-lg font-semibold text-slate-900">Workflow Editor</h1>
                <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-600">
                        Hello, <span className="font-medium text-slate-900">{user?.firstName || "User"}</span>
                    </span>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                </div>
            </div>
            {/* Toolbar Bar */}
            <div className="px-6 py-2 border-b border-slate-200 bg-white flex items-center justify-between">
                <WorkflowToolbar />
            </div>

            {/* Fullscreen Canvas Area */}
            <div className="flex-1 overflow-hidden bg-slate-50 relative flex">
                <NodesSidebar />
                <div className="flex-1 h-full relative">
                    <Canvas />
                </div>
                <RunHistorySidebar />
            </div>
        </div>
    );
}
