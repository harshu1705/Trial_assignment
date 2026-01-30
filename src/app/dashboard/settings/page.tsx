import { Settings as SettingsIcon, User, Database, Workflow, Zap, Key, Bell } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-lg">
                            <SettingsIcon className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
                    </div>
                    <p className="text-slate-600 ml-16">Manage your account and application preferences</p>
                </div>

                {/* Settings Sections */}
                <div className="space-y-6">
                    {/* Account Settings */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <div className="flex items-center gap-3">
                                <User className="w-5 h-5 text-violet-600" />
                                <h2 className="text-lg font-semibold text-slate-800">Account</h2>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700">Display Name</label>
                                <input
                                    type="text"
                                    placeholder="Your name"
                                    className="mt-1 w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">Email</label>
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="mt-1 w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500"
                                    disabled
                                />
                                <p className="mt-1 text-xs text-slate-500">Email is managed through your authentication provider</p>
                            </div>
                        </div>
                    </div>

                    {/* Workflow Preferences */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <div className="flex items-center gap-3">
                                <Workflow className="w-5 h-5 text-fuchsia-600" />
                                <h2 className="text-lg font-semibold text-slate-800">Workflow Preferences</h2>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Auto-save workflows</div>
                                    <div className="text-xs text-slate-500">Automatically save changes to workflows</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Show grid</div>
                                    <div className="text-xs text-slate-500">Display dot grid on canvas</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Snap to grid</div>
                                    <div className="text-xs text-slate-500">Align nodes to grid automatically</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* API Configurations */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <div className="flex items-center gap-3">
                                <Key className="w-5 h-5 text-blue-600" />
                                <h2 className="text-lg font-semibold text-slate-800">API Configuration</h2>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <div className="flex items-start gap-3">
                                    <Database className="w-5 h-5 text-blue-600 mt-0.5" />
                                    <div>
                                        <div className="font-medium text-blue-900">API Keys Status</div>
                                        <div className="text-sm text-blue-700 mt-1">
                                            API keys are configured via environment variables. Update your <code className="bg-blue-100 px-1 rounded">.env.local</code> file to modify API keys.
                                        </div>
                                        <div className="mt-3 space-y-2">
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                <span className="text-slate-700">Clerk Authentication</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                <span className="text-slate-700">Trigger.dev SDK</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                <span className="text-slate-700">AI Providers (Groq/Gemini)</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                                <span className="text-slate-700">Transloadit Media Processing</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Execution Settings */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <div className="flex items-center gap-3">
                                <Zap className="w-5 h-5 text-orange-600" />
                                <h2 className="text-lg font-semibold text-slate-800">Execution Settings</h2>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-medium text-slate-700">Default LLM Model</label>
                                <select className="mt-1 w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                                    <option>llama-3.3-70b-versatile (Groq)</option>
                                    <option>gemini-2.0-flash (Google)</option>
                                    <option>gemini-1.5-pro (Google)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-slate-700">Max Execution Timeout</label>
                                <select className="mt-1 w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500">
                                    <option>30 seconds</option>
                                    <option>1 minute</option>
                                    <option>5 minutes</option>
                                    <option>10 minutes</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                            <div className="flex items-center gap-3">
                                <Bell className="w-5 h-5 text-emerald-600" />
                                <h2 className="text-lg font-semibold text-slate-800">Notifications</h2>
                            </div>
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Execution completion</div>
                                    <div className="text-xs text-slate-500">Notify when workflows complete</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                                </label>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-medium text-slate-700">Error alerts</div>
                                    <div className="text-xs text-slate-500">Notify when executions fail</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-violet-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-violet-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="mt-8 flex justify-end gap-3">
                    <button className="px-6 py-2 border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors">
                        Reset
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-500 hover:to-fuchsia-500 transition-all shadow-lg shadow-violet-500/30">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}
