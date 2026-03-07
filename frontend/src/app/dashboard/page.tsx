"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Sparkles, Users, MessageSquare, Bot, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
    { label: "Active Agents", value: "12", icon: Bot, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Conversations", value: "1,284", icon: MessageSquare, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "Resolved by AI", value: "98.2%", icon: Sparkles, color: "text-amber-600", bg: "bg-amber-100" },
    { label: "Avg. Response Time", value: "0.4s", icon: Users, color: "text-emerald-600", bg: "bg-emerald-100" },
];

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Welcome back, John!</h1>
                    <p className="text-slate-500 mt-2">Here is what is happening with your AI agents today.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat) => (
                        <motion.div
                            whileHover={{ y: -5 }}
                            key={stat.label}
                            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                        >
                            <div className={`${stat.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                                <stat.icon className={`${stat.color} w-6 h-6`} />
                            </div>
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{stat.value}</h3>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white overflow-hidden relative">
                            <div className="relative z-10">
                                <h2 className="text-2xl font-bold">Deploy a new AI Employee</h2>
                                <p className="mt-2 text-indigo-100 max-w-md">Activate a specialized AI agent to handle sales, support, or marketing in minutes.</p>
                                <button className="mt-6 px-6 py-3 bg-white text-indigo-600 font-bold rounded-xl flex items-center gap-2 hover:bg-indigo-50 transition-colors">
                                    Get Started <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                            <Bot className="absolute -bottom-10 -right-10 w-64 h-64 text-white/10 rotate-12" />
                        </div>

                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Recent Activity</h3>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 py-3 border-b border-slate-100 last:border-0">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                            <MessageSquare className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">Sales Agent replied to <span className="text-indigo-600">alex@example.com</span></p>
                                            <p className="text-xs text-slate-500">2 minutes ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Top Performing Agents</h3>
                            <div className="space-y-6">
                                {[
                                    { name: "Support Bot", score: 94, color: "bg-emerald-500" },
                                    { name: "Lead Gen bot", score: 82, color: "bg-blue-500" },
                                    { name: "Content Planner", score: 76, color: "bg-purple-500" },
                                ].map((agent) => (
                                    <div key={agent.name}>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{agent.name}</span>
                                            <span className="font-bold">{agent.score}%</span>
                                        </div>
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                                            <div className={`${agent.color} h-2 rounded-full`} style={{ width: `${agent.score}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
