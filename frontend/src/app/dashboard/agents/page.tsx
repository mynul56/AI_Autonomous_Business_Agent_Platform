"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Bot, Plus, Search } from "lucide-react";

export default function AgentsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Agents</h1>
                        <p className="text-slate-500 mt-2">Manage and monitor your autonomous business agents.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                        <Plus className="w-4 h-4" />
                        Create Agent
                    </button>
                </div>

                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search agents by name or role..."
                        className="flex-1 bg-transparent border-none outline-none text-sm"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { name: "Sales Assistant", role: "Lead Qualification", status: "Active" },
                        { name: "Support Bot", role: "Customer Support (Web)", status: "Active" },
                        { name: "Content Planner", role: "Social Marketing", status: "Idle" },
                    ].map((agent) => (
                        <div key={agent.name} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-300 transition-all">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center mb-4">
                                <Bot className="text-indigo-600 dark:text-indigo-400 w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{agent.name}</h3>
                            <p className="text-sm text-slate-500">{agent.role}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-full ${agent.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"
                                    }`}>
                                    {agent.status}
                                </span>
                                <button className="text-xs font-bold text-indigo-600 hover:underline">Configure</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
