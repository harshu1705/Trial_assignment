"use client";

import { ArrowRight, Sparkles, Zap, Lock, Cloud, Code2, Workflow, Play, CheckCircle2, Star } from "lucide-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/Button";

interface LandingPageProps {
    isAuthEnabled: boolean;
}

export const LandingPage = ({ isAuthEnabled }: LandingPageProps) => {
    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-slate-950 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Hero Section */}
            <section className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
                <div className="max-w-6xl mx-auto text-center space-y-8">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-sm text-white/80">Production-Ready AI Workflow Platform</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-5xl sm:text-7xl font-black tracking-tight">
                        <span className="block text-white mb-2">Build AI Workflows</span>
                        <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                            In Minutes, Not Months
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Drag, drop, and deploy powerful AI workflows with{" "}
                        <span className="text-violet-400 font-semibold">visual canvas editing</span>,{" "}
                        <span className="text-fuchsia-400 font-semibold">serverless execution</span>, and{" "}
                        <span className="text-pink-400 font-semibold">real-time monitoring</span>.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
                        {!isAuthEnabled && (
                            <Button
                                variant="secondary"
                                disabled
                                className="bg-white/10 text-white/50 cursor-not-allowed hover:bg-white/10 px-8 py-6 text-lg"
                            >
                                Authentication not configured
                            </Button>
                        )}

                        {isAuthEnabled && (
                            <>
                                <SignedIn>
                                    <Button
                                        href="/dashboard"
                                        variant="primary"
                                        className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 px-8 py-6 text-lg font-semibold shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/70 transition-all duration-300"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Go to Dashboard
                                            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    </Button>
                                </SignedIn>

                                <SignedOut>
                                    <Button
                                        href="/sign-up"
                                        variant="primary"
                                        className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 px-8 py-6 text-lg font-semibold shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/70 transition-all duration-300"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Start Building Free
                                            <Sparkles className="h-5 w-5" />
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                                    </Button>

                                    <Button
                                        href="/sign-in"
                                        variant="secondary"
                                        className="bg-white/5 hover:bg-white/10 border border-white/20 text-white px-8 py-6 text-lg font-semibold backdrop-blur-sm transition-all duration-300"
                                    >
                                        Sign In
                                    </Button>
                                </SignedOut>
                            </>
                        )}
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex flex-wrap items-center justify-center gap-6 pt-12 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Production-ready</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Secure & compliant</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="relative z-10 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Everything You Need, <span className="text-violet-400">Nothing You Don't</span>
                        </h2>
                        <p className="text-xl text-slate-400">
                            Built with modern tech stack for maximum performance and reliability
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Feature Card 1 */}
                        <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-violet-500/50 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Workflow className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Visual Canvas Editor</h3>
                            <p className="text-slate-400">
                                Drag-and-drop interface powered by React Flow with 8+ node types for building complex workflows
                            </p>
                        </div>

                        {/* Feature Card 2 */}
                        <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-fuchsia-500/50 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-fuchsia-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Serverless Execution</h3>
                            <p className="text-slate-400">
                                Background job processing with Trigger.dev - no timeouts, no infrastructure management
                            </p>
                        </div>

                        {/* Feature Card 3 */}
                        <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Sparkles className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Multi-AI Integration</h3>
                            <p className="text-slate-400">
                                Google Gemini, Groq for LLM, vision models for image analysis with automatic fallbacks
                            </p>
                        </div>

                        {/* Feature Card 4 */}
                        <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Lock className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Enterprise Security</h3>
                            <p className="text-slate-400">
                                Clerk authentication with user data isolation, protected routes, and secure API endpoints
                            </p>
                        </div>

                        {/* Feature Card 5 */}
                        <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Play className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Real-Time Execution</h3>
                            <p className="text-slate-400">
                                Watch workflows execute with live status updates, animated nodes, and detailed execution logs
                            </p>
                        </div>

                        {/* Feature Card 6 */}
                        <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Cloud className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Production Database</h3>
                            <p className="text-slate-400">
                                PostgreSQL with Prisma ORM for workflow persistence, execution history, and data analytics
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="relative z-10 py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Built With <span className="text-fuchsia-400">Modern Technologies</span>
                        </h2>
                        <p className="text-slate-400">Industry-standard tools and frameworks</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {[
                            { name: "Next.js 16", color: "from-white to-slate-300" },
                            { name: "React 19", color: "from-cyan-400 to-blue-500" },
                            { name: "TypeScript", color: "from-blue-400 to-blue-600" },
                            { name: "Tailwind", color: "from-cyan-400 to-teal-400" },
                            { name: "Prisma", color: "from-slate-300 to-slate-400" },
                            { name: "Trigger.dev", color: "from-violet-400 to-purple-500" },
                            { name: "PostgreSQL", color: "from-blue-500 to-indigo-600" },
                            { name: "Clerk", color: "from-indigo-400 to-purple-500" },
                        ].map((tech) => (
                            <div
                                key={tech.name}
                                className="p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:scale-105 transition-all duration-300 text-center"
                            >
                                <div className={`text-sm font-semibold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                                    {tech.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative z-10 py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="p-12 rounded-3xl bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-pink-500/10 border border-white/20 backdrop-blur-sm">
                        <h2 className="text-4xl font-bold text-white mb-4">
                            Ready to Build Something Amazing?
                        </h2>
                        <p className="text-xl text-slate-300 mb-8">
                            Join developers building the future of AI workflows
                        </p>
                        {isAuthEnabled && (
                            <SignedOut>
                                <Button
                                    href="/sign-up"
                                    variant="primary"
                                    className="group relative overflow-hidden bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 px-8 py-6 text-lg font-semibold shadow-2xl shadow-violet-500/50 hover:shadow-violet-500/70 transition-all duration-300"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Get Started Now
                                        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </Button>
                            </SignedOut>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-4 border-t border-white/10">
                <div className="max-w-6xl mx-auto text-center text-slate-500 text-sm">
                    <p>Built with ❤️ for the Fullstack Engineer Assignment</p>
                    <p className="mt-2">© 2026 Galaxy.ai. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
};
