"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/Button";

interface LandingPageProps {
    isAuthEnabled: boolean;
}

export const LandingPage = ({ isAuthEnabled }: LandingPageProps) => {
    return (
        <main className="min-h-screen bg-[#111827] flex flex-col items-center justify-center text-center text-white p-4">
            <div className="space-y-6 max-w-3xl">
                <div className="flex justify-center mb-6">
                    <div className="rounded-full bg-white/10 p-4 ring-1 ring-white/20">
                        <ShieldCheck className="h-12 w-12 text-emerald-500" />
                    </div>
                </div>

                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
                    Secure, Scalable, <span className="text-emerald-500">Extraordinary.</span>
                </h1>

                <p className="text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto">
                    Experience the next generation of application shells. Built with Next.js 16, Clerk Authentication, and tailor-made design.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    {!isAuthEnabled && (
                        <Button
                            variant="secondary"
                            disabled
                            className="bg-white/10 text-white/50 cursor-not-allowed hover:bg-white/10"
                        >
                            Authentication not configured
                        </Button>
                    )}

                    {isAuthEnabled && (
                        <>
                            <SignedIn>
                                <Button href="/dashboard" variant="primary">
                                    Go to Dashboard
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>
                            </SignedIn>

                            <SignedOut>
                                <Button href="/sign-up" variant="primary">
                                    Get Started
                                    <ArrowRight className="h-4 w-4 ml-2" />
                                </Button>

                                <Button href="/sign-in" variant="secondary">
                                    Sign In
                                </Button>
                            </SignedOut>
                        </>
                    )}
                </div>
            </div>
        </main>
    );
};
