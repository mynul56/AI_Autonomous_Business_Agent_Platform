"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Settings, CreditCard, Shield, Bell, Check, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
    { id: "general", name: "General", icon: Settings },
    { id: "billing", name: "Billing", icon: CreditCard },
    { id: "security", name: "Security", icon: Shield },
    { id: "notifications", name: "Notifications", icon: Bell },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = React.useState("general");
    const [isSaving, setIsSaving] = React.useState(false);
    const [isSaved, setIsSaved] = React.useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }, 800);
    };

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
                    <p className="text-slate-500 mt-2">Manage your platform preferences and account details.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Tabs */}
                    <div className="md:col-span-1 space-y-1">
                        {TABS.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all",
                                    activeTab === item.id
                                        ? "bg-white dark:bg-slate-900 shadow-sm text-indigo-600 border border-slate-100 dark:border-slate-800"
                                        : "text-slate-500 hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
                                )}
                            >
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </button>
                        ))}
                    </div>

                    {/* Main content area */}
                    <div className="md:col-span-3">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[500px]"
                            >
                                {activeTab === "general" && (
                                    <form onSubmit={handleSave} className="space-y-8">
                                        <div>
                                            <h3 className="text-lg font-bold">General Information</h3>
                                            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Personal profile and identity</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase">First Name</label>
                                                    <input type="text" defaultValue="John" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-slate-500 uppercase">Last Name</label>
                                                    <input type="text" defaultValue="Doe" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Email Address</label>
                                                <input type="email" defaultValue="john@example.com" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all" />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase">Bio / Description</label>
                                                <textarea rows={3} defaultValue="Administrator at ACME Corp managing AI integrations." className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-sm transition-all resize-none" />
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
                                            <button
                                                type="submit"
                                                disabled={isSaving}
                                                className={cn(
                                                    "flex items-center gap-2 px-8 py-3 rounded-xl font-bold text-sm transition-all relative overflow-hidden",
                                                    isSaved ? "bg-emerald-500 text-white" : "bg-indigo-600 text-white hover:bg-indigo-700"
                                                )}
                                            >
                                                {isSaving ? (
                                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                ) : isSaved ? (
                                                    <><Check className="w-4 h-4" /> Changes Saved</>
                                                ) : (
                                                    <><Save className="w-4 h-4" /> Save Changes</>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                )}

                                {activeTab === "billing" && (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-lg font-bold">Billing & Subscription</h3>
                                            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Manage your plans and payments</p>
                                        </div>
                                        <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 flex justify-between items-center">
                                            <div>
                                                <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase">Current Plan</p>
                                                <h4 className="text-2xl font-black mt-1">Growth Plan <span className="text-sm font-medium text-slate-500">($99/mo)</span></h4>
                                            </div>
                                            <button className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg">Upgrade Plan</button>
                                        </div>
                                    </div>
                                )}

                                {activeTab !== "general" && activeTab !== "billing" && (
                                    <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                                        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
                                            <Shield className="w-8 h-8 text-slate-300" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">Module Coming Soon</h4>
                                            <p className="text-sm text-slate-400 max-w-xs">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} settings are being prepared for your organization.</p>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
