"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Users,
    Bot,
    MessageSquare,
    Database,
    Settings,
    BarChart3,
    Workflow,
    Sparkles,
    ChevronLeft,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const sidebarItems = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "AI Agents", href: "/dashboard/agents", icon: Bot },
    { name: "Knowledge Base", href: "/dashboard/knowledge", icon: Database },
    { name: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
    { name: "Workflows", href: "/dashboard/workflows", icon: Workflow },
    { name: "Team", href: "/dashboard/team", icon: Users },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 80 : 260 }}
            className={cn(
                "h-screen sticky top-0 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all duration-300 flex flex-col",
                collapsed ? "items-center" : "items-start"
            )}
        >
            <div className="p-6 flex items-center gap-3 w-full">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Sparkles className="text-white w-6 h-6" />
                </div>
                {!collapsed && (
                    <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white truncate">
                        Antigravity
                    </span>
                )}
            </div>

            <nav className="flex-1 w-full px-3 space-y-1">
                {sidebarItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-3 rounded-lg transition-all group",
                                isActive
                                    ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400"
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                            )}
                        >
                            <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-indigo-600" : "group-hover:text-slate-900 dark:group-hover:text-white")} />
                            {!collapsed && <span className="font-medium">{item.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            <button
                onClick={() => setCollapsed(!collapsed)}
                className="m-4 p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
                {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
        </motion.aside>
    );
}
