"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MessageSquare, Calendar, Filter } from "lucide-react";

export default function ConversationsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Conversations</h1>
                    <p className="text-slate-500 mt-2">Monitor live and past interactions between customers and agents.</p>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between gap-4">
                        <div className="flex gap-2">
                            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all">
                                <Filter className="w-3 h-3" /> Filter
                            </button>
                            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 transition-all">
                                <Calendar className="w-3 h-3" /> Date Range
                            </button>
                        </div>
                        <p className="text-xs text-slate-400 font-medium">Total: 42 conversations today</p>
                    </div>

                    <div className="divide-y divide-slate-50 dark:divide-slate-800">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Visitor #9482</p>
                                        <span className="text-[10px] text-slate-400">14:32</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate max-w-md">"How much does the enterprise plan cost?"</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Replied by Sales Bot</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
