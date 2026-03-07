"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Settings, CreditCard, Shield, Bell, Appearance } from "lucide-react";

export default function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Settings</h1>
                    <p className="text-slate-500 mt-2">Manage your platform preferences and account details.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1 space-y-1">
                        {[
                            { name: "General", icon: Settings, active: true },
                            { name: "Billing", icon: CreditCard, active: false },
                            { name: "Security", icon: Shield, active: false },
                            { name: "Notifications", icon: Bell, active: false },
                        ].map((item) => (
                            <button key={item.name} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all ${item.active ? 'bg-white dark:bg-slate-900 shadow-sm text-indigo-600' : 'text-slate-500 hover:bg-slate-200/50'
                                }`}>
                                <item.icon className="w-4 h-4" />
                                {item.name}
                            </button>
                        ))}
                    </div>

                    <div className="md:col-span-3 space-y-6">
                        <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                            <h3 className="text-lg font-bold mb-6">General Information</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">First Name</label>
                                        <input type="text" defaultValue="John" className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none text-sm" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase">Last Name</label>
                                        <input type="text" defaultValue="Doe" className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none text-sm" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase">Email Address</label>
                                    <input type="email" defaultValue="john@example.com" className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none text-sm" />
                                </div>
                                <button className="mt-4 px-6 py-2.5 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
