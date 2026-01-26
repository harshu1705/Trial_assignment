import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
    const { userId } = await auth();

    if (!userId) {
        redirect("/sign-in");
    }

    const user = await currentUser();

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-700">Welcome back!</h3>
                    <p className="text-slate-500 mt-2">
                        Hello, {user?.firstName || "User"}
                    </p>
                </div>
                <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-200">
                    <h3 className="font-semibold text-slate-700">Status</h3>
                    <p className="text-emerald-500 mt-2 font-medium">
                        Active
                    </p>
                </div>
            </div>
        </div>
    );
}
