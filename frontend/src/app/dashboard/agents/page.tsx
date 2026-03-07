"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Bot, Plus, Search, Trash2, Edit3, MoreHorizontal } from "lucide-react";
import { useAgents } from "@/hooks/use-agents";
import { CreateAgentModal } from "@/components/agents/CreateAgentModal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function AgentsPage() {
    const { agents, deleteAgent } = useAgents();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");

    const filteredAgents = agents.filter(agent =>
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        agent.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">AI Agents</h1>
                        <p className="text-slate-500 mt-2">Manage and monitor your autonomous business agents.</p>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
                    >
                        <Plus className="w-4 h-4" />
                        Create Agent
                    </button>
                </div>

                <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search agents by name or role..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent border-none outline-none text-sm"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredAgents.map((agent) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                key={agent.id}
                                className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all group relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-14 h-14 bg-indigo-100 dark:bg-indigo-900/20 rounded-2xl flex items-center justify-center">
                                        <Bot className="text-indigo-600 dark:text-indigo-400 w-8 h-8" />
                                    </div>
                                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button
                                            onClick={() => deleteAgent(agent.id)}
                                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                            title="Delete Agent"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{agent.name}</h3>
                                <p className="text-sm font-medium text-slate-500 mt-1">{agent.role}</p>

                                <div className="mt-6 flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-4">
                                    <div className="flex items-center gap-2">
                                        <div className={cn(
                                            "w-2 h-2 rounded-full",
                                            agent.status === "Active" ? "bg-emerald-500" : "bg-slate-300"
                                        )} />
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                            {agent.status}
                                        </span>
                                    </div>
                                    <button className="text-xs font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors">
                                        Configure
                                    </button>
                                </div>

                                {/* Decorative background bot */}
                                <Bot className="absolute -bottom-6 -right-6 w-24 h-24 text-slate-50 dark:text-white/5 -rotate-12 z-0 group-hover:text-indigo-500/10 transition-colors pointer-events-none" />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredAgents.length === 0 && (
                        <div className="col-span-full py-20 text-center space-y-4">
                            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
                                <Search className="w-8 h-8 text-slate-300" />
                            </div>
                            <p className="text-slate-500 font-medium">No agents found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>

            <CreateAgentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </DashboardLayout>
    );
}
