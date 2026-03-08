"use client";
import React from "react";
import { X, Workflow, Zap, Settings2 } from "lucide-react";
import { useWorkflows } from "@/hooks/use-workflows";
import { motion, AnimatePresence } from "framer-motion";

interface CreateWorkflowModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TRIGGER_TEMPLATES = ["Message Received", "Unresolved Query", "New Lead", "Negative Sentiment"];
const ACTION_TEMPLATES = ["Send Email", "Alert Slack", "Tag Agent", "Create Task"];

export function CreateWorkflowModal({ isOpen, onClose }: CreateWorkflowModalProps) {
    const { addWorkflow } = useWorkflows();
    const [formData, setFormData] = React.useState({
        title: "",
        trigger: TRIGGER_TEMPLATES[0],
        action: ACTION_TEMPLATES[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addWorkflow({
            ...formData,
            color: "bg-indigo-500",
        });
        setFormData({ title: "", trigger: TRIGGER_TEMPLATES[0], action: ACTION_TEMPLATES[0] });
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
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-[101] overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-900/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                                    <Workflow className="text-white w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold">New Automation</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Workflow Title</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Lead Follow-up"
                                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trigger</label>
                                    <select
                                        value={formData.trigger}
                                        onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
                                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    >
                                        {TRIGGER_TEMPLATES.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Action</label>
                                    <select
                                        value={formData.action}
                                        onChange={(e) => setFormData({ ...formData, action: e.target.value })}
                                        className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    >
                                        {ACTION_TEMPLATES.map(a => <option key={a} value={a}>{a}</option>)}
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 shadow-lg"
                            >
                                Activate Workflow
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
