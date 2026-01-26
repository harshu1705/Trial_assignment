import { ClerkProvider } from "@clerk/nextjs";
import { Sidebar } from "@/components/Sidebar";
import { redirect } from "next/navigation";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

    if (!publishableKey) {
        redirect("/");
    }

    return (
        <ClerkProvider publishableKey={publishableKey}>
            <div className="h-full relative">
                <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                    <Sidebar />
                </div>
                <main className="md:pl-72 h-full bg-slate-50 text-slate-900">
                    {children}
                </main>
            </div>
        </ClerkProvider>
    );
}
