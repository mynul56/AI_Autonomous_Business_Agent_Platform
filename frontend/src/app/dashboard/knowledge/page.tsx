"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Database, FileUp, Globe, Link2 } from "lucide-react";
import { useKnowledge } from "@/hooks/use-knowledge";

export default function KnowledgePage() {
    const { items, removeItem } = useKnowledge();

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Knowledge Base</h1>
                        <p className="text-slate-500 mt-2">Train your agents with your documents, websites, and data sources.</p>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
                            <Globe className="w-4 h-4" />
                            Add URL
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
                            <FileUp className="w-4 h-4" />
                            Upload Files
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
                                {item.type === "URL" ? <Link2 className="w-5 h-5 text-slate-500" /> : <Database className="w-5 h-5 text-slate-500" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold truncate text-slate-900 dark:text-white">{item.name}</p>
                                <p className="text-xs text-slate-500">{item.type} {item.size ? `• ${item.size}` : ""} • {new Date(item.createdAt).toLocaleDateString()}</p>
                            </div>
                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-[10px] font-bold text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <div className="col-span-full py-20 text-center text-slate-500">
                            No knowledge items found. Add some to get started.
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
