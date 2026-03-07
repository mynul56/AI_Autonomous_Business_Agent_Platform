"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Workflow, Play, Settings2, ArrowRight } from "lucide-react";

export default function WorkflowsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Workflows</h1>
                        <p className="text-slate-500 mt-2">Automate business processes with AI-triggered rules.</p>
                    </div>
                    <button className="px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all">
                        New Automation
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {[
                        { title: "Lead Follow-up", trigger: "Message Received", action: "Send Email", color: "bg-blue-500" },
                        { title: "Support Escalation", trigger: "Unresolved Query", action: "Alert Slack", color: "bg-red-500" },
                    ].map((flow) => (
                        <div key={flow.title} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${flow.color} text-white`}>
                                        <Workflow className="w-5 h-5" />
                                    </div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">{flow.title}</h3>
                                </div>
                                <button className="p-2 hover:bg-slate-100 rounded-lg">
                                    <Settings2 className="w-4 h-4 text-slate-400" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 text-sm">
                                <div className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full font-medium">{flow.trigger}</div>
                                <ArrowRight className="w-4 h-4 text-slate-300" />
                                <div className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-full font-medium">{flow.action}</div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
                                <p className="text-xs text-slate-400 font-medium">Last triggered: 1 hour ago</p>
                                <div className="flex gap-2">
                                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                                        <Play className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
}
