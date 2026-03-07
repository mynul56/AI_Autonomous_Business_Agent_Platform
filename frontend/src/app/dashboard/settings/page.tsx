"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
    Settings,
    CreditCard,
    Shield,
    Bell,
    Check,
    Save,
    Lock,
    Smartphone,
    History,
    Globe,
    Mail,
    AppWindow,
    Zap,
    CheckCircle2,
    Trash2,
    Plus
} from "lucide-react";
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

    // States for functional logic
    const [twoFactor, setTwoFactor] = React.useState(true);
    const [notifPreferences, setNotifPreferences] = React.useState({
        email_leads: true,
        email_billing: true,
        app_leads: true,
        app_security: true,
    });

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            setIsSaved(true);
            setTimeout(() => setIsSaved(false), 2000);
        }, 800);
    };

    const toggleNotif = (key: keyof typeof notifPreferences) => {
        setNotifPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <DashboardLayout>
            <div className="space-y-8 pb-20">
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
                                className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm min-h-[600px]"
                            >
                                {/* GENERAL TAB */}
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
                                                <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
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

                                {/* BILLING TAB */}
                                {activeTab === "billing" && (
                                    <div className="space-y-8">
                                        <div>
                                            <h3 className="text-lg font-bold">Billing & Subscription</h3>
                                            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Manage your plans and payments</p>
                                        </div>

                                        {/* Active Plan */}
                                        <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
                                            <div className="relative z-10">
                                                <p className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">Active Plan</p>
                                                <h4 className="text-3xl font-black mt-1 flex items-baseline gap-2">Growth <span className="text-sm font-medium text-slate-500">($99/mo)</span></h4>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Next invoice on April 12, 2026</p>
                                            </div>
                                            <div className="flex gap-3 relative z-10">
                                                <button className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white text-xs font-bold rounded-xl hover:bg-slate-50 transition-all">Cancel Plan</button>
                                                <button className="px-6 py-3 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">Upgrade</button>
                                            </div>
                                            <Zap className="absolute -right-10 -bottom-10 w-40 h-40 text-indigo-600/5 rotate-12 z-0" />
                                        </div>

                                        {/* Payment Method */}
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-bold">Payment Methods</h4>
                                            <div className="p-4 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-between group">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-8 bg-slate-100 dark:bg-slate-800 rounded flex items-center justify-center">
                                                        <span className="text-[10px] font-black text-slate-400 italic">VISA</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold">Visa ending in 4242</p>
                                                        <p className="text-xs text-slate-400">Expires 12/28</p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="p-2 h-8 w-8 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg flex items-center justify-center transition-colors">
                                                        <Trash2 className="w-4 h-4 text-slate-400" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button className="w-full py-4 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl text-xs font-bold text-slate-400 hover:text-indigo-600 hover:border-indigo-100 transition-all flex items-center justify-center gap-2">
                                                <Plus className="w-4 h-4" /> Add New Method
                                            </button>
                                        </div>

                                        {/* History */}
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <h4 className="text-sm font-bold">Invoices</h4>
                                                <button className="text-[10px] font-bold text-indigo-600 hover:underline">Download all</button>
                                            </div>
                                            <div className="space-y-1">
                                                {[
                                                    { date: "Mar 12, 2026", amount: "$99.00", status: "Paid" },
                                                    { date: "Feb 12, 2026", amount: "$99.00", status: "Paid" }
                                                ].map((inv, idx) => (
                                                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-all">
                                                        <div className="flex items-center gap-3">
                                                            <History className="w-4 h-4 text-slate-300" />
                                                            <span className="text-sm font-medium">{inv.date}</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <span className="text-sm font-bold">{inv.amount}</span>
                                                            <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-md">{inv.status}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* SECURITY TAB */}
                                {activeTab === "security" && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                                        <div>
                                            <h3 className="text-lg font-bold">Security Settings</h3>
                                            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Protect your account and organization</p>
                                        </div>

                                        {/* Password Change */}
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 mb-4">
                                                <Lock className="w-5 h-5 text-indigo-600" />
                                                <h4 className="text-sm font-bold">Update Password</h4>
                                            </div>
                                            <div className="grid grid-cols-1 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Current Password</label>
                                                    <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                                                </div>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">New Password</label>
                                                        <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Confirm New Password</label>
                                                        <input type="password" placeholder="••••••••" className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                                                    </div>
                                                </div>
                                            </div>
                                            <button className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[11px] font-bold rounded-xl hover:opacity-90 transition-all">Update Password</button>
                                        </div>

                                        {/* 2FA */}
                                        <div className="pt-8 border-t border-slate-50 dark:border-slate-800">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <Smartphone className="w-5 h-5 text-indigo-600" />
                                                    <div>
                                                        <h4 className="text-sm font-bold">Two-Factor Authentication</h4>
                                                        <p className="text-xs text-slate-500">Enable 2FA to add an extra layer of security</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setTwoFactor(!twoFactor)}
                                                    className={cn(
                                                        "w-12 h-6 rounded-full transition-colors relative",
                                                        twoFactor ? "bg-indigo-600" : "bg-slate-200 dark:bg-slate-700"
                                                    )}
                                                >
                                                    <motion.div
                                                        animate={{ x: twoFactor ? 26 : 2 }}
                                                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                                    />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Sessions */}
                                        <div className="pt-8 border-t border-slate-50 dark:border-slate-800">
                                            <h4 className="text-sm font-bold mb-4 flex items-center gap-2">
                                                <Globe className="w-5 h-5 text-indigo-600" /> Active Sessions
                                            </h4>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-white dark:bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
                                                            <AppWindow className="w-5 h-5 text-slate-400" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-slate-900 dark:text-white">macOS • Chrome 122</p>
                                                            <p className="text-xs text-slate-400">Current Session • United States</p>
                                                        </div>
                                                    </div>
                                                    <button className="text-[10px] font-bold text-slate-400 hover:text-red-500">Log out</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* NOTIFICATIONS TAB */}
                                {activeTab === "notifications" && (
                                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2">
                                        <div>
                                            <h3 className="text-lg font-bold">Notification Preferences</h3>
                                            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Control how and when you hear from us</p>
                                        </div>

                                        <div className="space-y-6">
                                            {/* Group: Leads */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                                                    <h4 className="text-sm font-bold">Agent Activity</h4>
                                                </div>

                                                <div className="grid grid-cols-1 gap-3">
                                                    <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-100 transition-all">
                                                        <div>
                                                            <p className="text-sm font-bold">Lead Qualified</p>
                                                            <p className="text-xs text-slate-400">Notify me when an agent captures a new lead</p>
                                                        </div>
                                                        <div className="flex gap-4">
                                                            <div className="flex flex-col items-center gap-1">
                                                                <span className="text-[9px] font-black text-slate-300 uppercase">App</span>
                                                                <button onClick={() => toggleNotif('app_leads')} className={cn("w-10 h-5 rounded-full relative transition-colors", notifPreferences.app_leads ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700')}>
                                                                    <motion.div animate={{ x: notifPreferences.app_leads ? 22 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full" />
                                                                </button>
                                                            </div>
                                                            <div className="flex flex-col items-center gap-1">
                                                                <span className="text-[9px] font-black text-slate-300 uppercase">Email</span>
                                                                <button onClick={() => toggleNotif('email_leads')} className={cn("w-10 h-5 rounded-full relative transition-colors", notifPreferences.email_leads ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700')}>
                                                                    <motion.div animate={{ x: notifPreferences.email_leads ? 22 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Group: Billing */}
                                            <div className="space-y-4 pt-6 border-t border-slate-50 dark:border-slate-800">
                                                <div className="flex items-center gap-3">
                                                    <CreditCard className="w-5 h-5 text-indigo-600" />
                                                    <h4 className="text-sm font-bold">Billing & Security</h4>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium">Payment & Invoices (Email only)</p>
                                                        <button onClick={() => toggleNotif('email_billing')} className={cn("w-10 h-5 rounded-full relative transition-colors", notifPreferences.email_billing ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700')}>
                                                            <motion.div animate={{ x: notifPreferences.email_billing ? 22 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full" />
                                                        </button>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <p className="text-sm font-medium">Security Alerts (In-App only)</p>
                                                        <button onClick={() => toggleNotif('app_security')} className={cn("w-10 h-5 rounded-full relative transition-colors", notifPreferences.app_security ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700')}>
                                                            <motion.div animate={{ x: notifPreferences.app_security ? 22 : 2 }} className="absolute top-1 w-3 h-3 bg-white rounded-full" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
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
