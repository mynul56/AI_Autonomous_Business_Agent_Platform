"use client";

import React from "react";
import { ChevronDown, Plus, Check } from "lucide-react";
import { useOrganization } from "@/hooks/use-organization";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function OrganizationSwitcher() {
    const { activeOrg, organizations, setActiveOrg, createOrg } = useOrganization();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isCreating, setIsCreating] = React.useState(false);
    const [newOrgName, setNewOrgName] = React.useState("");

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newOrgName.trim()) {
            await createOrg(newOrgName);
            setNewOrgName("");
            setIsCreating(false);
            setIsOpen(false);
        }
    };

    return (
        <div className="relative w-full px-4 mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-all"
            >
                <div className="flex items-center gap-3 truncate">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                        {activeOrg?.name.charAt(0)}
                    </div>
                    <span className="text-sm font-semibold truncate">{activeOrg?.name}</span>
                </div>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute left-4 right-4 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 p-2"
                        >
                            <p className="px-3 py-2 text-[10px] uppercase tracking-wider font-bold text-slate-400">Organizations</p>
                            <div className="space-y-1">
                                {organizations.map((org) => (
                                    <button
                                        key={org.id}
                                        onClick={() => {
                                            setActiveOrg(org);
                                            setIsOpen(false);
                                        }}
                                        className={cn(
                                            "w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all",
                                            activeOrg?.id === org.id && "bg-slate-50 dark:bg-slate-800/50"
                                        )}
                                    >
                                        <span className="text-sm font-medium">{org.name}</span>
                                        {activeOrg?.id === org.id && <Check className="w-4 h-4 text-indigo-500" />}
                                    </button>
                                ))}
                            </div>
                            <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-2" />

                            {!isCreating ? (
                                <button
                                    onClick={() => setIsCreating(true)}
                                    className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 text-indigo-600 transition-all text-sm font-medium"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create Organization
                                </button>
                            ) : (
                                <form onSubmit={handleCreate} className="p-2 space-y-2">
                                    <input
                                        autoFocus
                                        value={newOrgName}
                                        onChange={(e) => setNewOrgName(e.target.value)}
                                        placeholder="Company name..."
                                        className="w-full p-2 text-sm rounded-lg border border-slate-200 dark:border-slate-800 outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsCreating(false)}
                                            className="flex-1 px-3 py-2 text-xs rounded-lg bg-slate-100 hover:bg-slate-200 transition-all"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-3 py-2 text-xs rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-all"
                                        >
                                            Create
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
