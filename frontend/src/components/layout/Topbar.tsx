"use client";

import React from "react";
import { Bell, Search, User } from "lucide-react";
import { cn } from "@/lib/utils";

export function Topbar() {
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
                <button className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 relative">
                    <Bell className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900" />
                </button>

                <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2" />

                <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">John Doe</p>
                        <p className="text-xs text-slate-500">ACME Corp (Admin)</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                        <User className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </header>
    );
}
