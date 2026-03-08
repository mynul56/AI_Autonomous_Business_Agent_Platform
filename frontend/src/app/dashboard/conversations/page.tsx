"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { MessageSquare, Calendar, Filter, X, User, Bot, Clock } from "lucide-react";
import { useConversations, Conversation } from "@/hooks/use-conversations";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConversationsPage() {
    const { conversations } = useConversations();
    const [selectedConv, setSelectedConv] = React.useState<Conversation | null>(null);

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
                        <p className="text-xs text-slate-400 font-medium">Total: {conversations.length} conversations</p>
                    </div>

                    <div className="divide-y divide-slate-50 dark:divide-slate-800">
                        {conversations.map((conv) => (
                            <div
                                key={conv.id}
                                onClick={() => setSelectedConv(conv)}
                                className="p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 cursor-pointer transition-all flex items-center gap-4"
                            >
                                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Visitor {conv.visitor_id.substring(0, 8)}</p>
                                        <span className="text-[10px] text-slate-400">{new Date(conv.created_at).toLocaleTimeString()}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 truncate max-w-md">"{conv.last_message || "No messages yet"}"</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${conv.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{conv.status}</span>
                                </div>
                            </div>
                        ))}
                        {conversations.length === 0 && (
                            <div className="p-10 text-center text-slate-500 text-sm">
                                No conversations found.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {selectedConv && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedConv(null)}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl z-[101] flex flex-col"
                        >
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                                <h2 className="text-xl font-bold">Conversation Details</h2>
                                <button onClick={() => setSelectedConv(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-8 flex-1 overflow-y-auto space-y-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                        <User className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold">Visitor {selectedConv.visitor_id.substring(0, 12)}</p>
                                        <div className="flex items-center gap-2 text-xs text-slate-500">
                                            <Clock className="w-3 h-3" />
                                            Started {new Date(selectedConv.created_at).toLocaleString()}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest text-[10px]">Session Logs</h3>
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl">
                                            <div className="flex items-center gap-2 mb-2">
                                                <User className="w-3 h-3 text-slate-400" />
                                                <span className="text-[10px] font-bold text-slate-500">Visitor</span>
                                            </div>
                                            <p className="text-sm text-slate-700 dark:text-slate-300">
                                                {selectedConv.last_message || "Conversation started."}
                                            </p>
                                        </div>
                                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/40">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Bot className="w-3 h-3 text-indigo-600" />
                                                <span className="text-[10px] font-bold text-indigo-600">AI Agent</span>
                                            </div>
                                            <p className="text-sm text-indigo-900 dark:text-indigo-100 italic">
                                                Waiting for agent response or analysis...
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                                <button
                                    onClick={() => setSelectedConv(null)}
                                    className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-all"
                                >
                                    Close Detail
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
