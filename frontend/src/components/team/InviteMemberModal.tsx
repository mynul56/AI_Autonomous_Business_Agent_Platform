"use client";

import React from "react";
import { X, UserPlus, Mail, Shield, Check } from "lucide-react";
import { useTeam, Role } from "@/hooks/use-team";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface InviteMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ROLES: { id: Role, label: string, desc: string }[] = [
    { id: "Admin", label: "Admin", desc: "Full access to settings and members." },
    { id: "Member", label: "Member", desc: "Can manage agents and knowledge base." },
    { id: "Viewer", label: "Viewer", desc: "Can only view activity and logs." },
];

export function InviteMemberModal({ isOpen, onClose }: InviteMemberModalProps) {
    const { inviteMember } = useTeam();
    const [formData, setFormData] = React.useState({
        name: "",
        email: "",
        role: "Member" as Role,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        inviteMember(formData);
        setFormData({ name: "", email: "", role: "Member" });
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-[101] overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-900/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                                    <UserPlus className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Invite Member</h2>
                                    <p className="text-xs text-slate-500">Add a new teammate to your workspace.</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Full Name</label>
                                    <input
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="e.g. Alex Johnson"
                                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="alex@example.com"
                                            className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Role</label>
                                <div className="grid grid-cols-1 gap-2">
                                    {ROLES.map((role) => (
                                        <button
                                            key={role.id}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, role: role.id })}
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-2xl border transition-all text-left group",
                                                formData.role === role.id
                                                    ? "border-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/20"
                                                    : "border-slate-100 dark:border-slate-800 hover:border-slate-300"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={cn(
                                                    "w-8 h-8 rounded-lg flex items-center justify-center transition-colors",
                                                    formData.role === role.id ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                                                )}>
                                                    <Shield className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold">{role.label}</p>
                                                    <p className="text-[10px] text-slate-500">{role.desc}</p>
                                                </div>
                                            </div>
                                            {formData.role === role.id && <Check className="w-4 h-4 text-indigo-600" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-sm hover:bg-slate-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none"
                                >
                                    Send Invitation
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
