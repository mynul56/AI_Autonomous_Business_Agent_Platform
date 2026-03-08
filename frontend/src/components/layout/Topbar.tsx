"use client";

import React from "react";
import { Bell, Search, User, X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_NOTIFICATIONS = [
    { id: 1, title: "New Lead Qualified", message: "Sales Bot just qualified alex@example.com", type: "success", time: "2m ago", read: false },
    { id: 2, title: "Agent Idle", message: "Content Planner is currently idle.", type: "info", time: "1h ago", read: false },
    { id: 3, title: "System Update", message: "Platform v1.2 is now live.", type: "warning", time: "5h ago", read: true },
];

export function Topbar() {
    const [isNotifOpen, setIsNotifOpen] = React.useState(false);
    const [notifications, setNotifications] = React.useState(INITIAL_NOTIFICATIONS);

    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: number) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const clearAll = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    return (
        <header className="h-20 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10 px-8 flex items-center justify-between">
            <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search for agents, logs, or knowledge..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 transition-all outline-none text-sm"
                />
            </div>

            <div className="flex items-center gap-4">
                {/* Notifications Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsNotifOpen(!isNotifOpen)}
                        className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 relative transition-colors"
                    >
                        <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                        )}
                    </button>

                    <AnimatePresence>
                        {isNotifOpen && (
                            <>
                                <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
                                >
                                    <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/30">
                                        <h3 className="font-bold text-sm">Notifications</h3>
                                        <button onClick={clearAll} className="text-[10px] font-bold text-indigo-600 hover:underline">Mark all as read</button>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-800">
                                        {notifications.length > 0 ? (
                                            notifications.map((n) => (
                                                <div
                                                    key={n.id}
                                                    className={cn(
                                                        "p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer relative group",
                                                        !n.read && "bg-indigo-50/30 dark:bg-indigo-900/10"
                                                    )}
                                                    onClick={() => markAsRead(n.id)}
                                                >
                                                    <div className="flex gap-3">
                                                        <div className={cn(
                                                            "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                                                            n.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                                                        )}>
                                                            {n.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <Info className="w-4 h-4" />}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex justify-between items-start">
                                                                <p className="text-xs font-bold truncate">{n.title}</p>
                                                                <span className="text-[10px] text-slate-400">{n.time}</span>
                                                            </div>
                                                            <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{n.message}</p>
                                                        </div>
                                                    </div>
                                                    {!n.read && (
                                                        <div className="absolute right-2 bottom-2 w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                                                    )}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="p-8 text-center">
                                                <Bell className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                                                <p className="text-xs text-slate-400">No notifications yet.</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3 bg-slate-50 dark:bg-slate-800/30 text-center border-t border-slate-100 dark:border-slate-800">
                                        <button className="text-[10px] font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">See all activity</button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

                <Link href="/dashboard/settings" className="flex items-center gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded-xl transition-all">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">John Doe</p>
                        <p className="text-xs text-slate-500">ACME Corp (Admin)</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white border-2 border-white dark:border-slate-900 shadow-sm">
                        <User className="w-6 h-6" />
                    </div>
                </Link>
            </div>
        </header>
    );
}
