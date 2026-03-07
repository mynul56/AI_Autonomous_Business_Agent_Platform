"use client";

import React from "react";
import { X, Bot, Sparkles, Wand2 } from "lucide-react";
import { useAgents } from "@/hooks/use-agents";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface CreateAgentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const TEMPLATES = [
    { name: "Sales", role: "Lead Qualification", prompt: "You are a Sales Assistant. Your goal is to qualify leads by asking about their budget, timeline, and authority. Be professional and persuasive." },
    { name: "Support", role: "Customer Service", prompt: "You are a Customer Support Agent. Answer technical questions based on the knowledge base. Be patient, helpful, and concise." },
    { name: "Marketing", role: "Content Strategy", prompt: "You are an AI Marketing Agent. Help users generate content ideas and campaign outlines. Be creative and data-driven." },
];

export function CreateAgentModal({ isOpen, onClose }: CreateAgentModalProps) {
    const { addAgent } = useAgents();
    const [step, setStep] = React.useState(1);
    const [formData, setFormData] = React.useState({
        name: "",
        role: "",
        prompt: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addAgent(formData);
        setFormData({ name: "", role: "", prompt: "" });
        setStep(1);
        onClose();
    };

    const selectTemplate = (template: typeof TEMPLATES[0]) => {
        setFormData({
            name: `${template.name} Agent`,
            role: template.role,
            prompt: template.prompt,
        });
        setStep(2);
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
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl z-[101] overflow-hidden"
                    >
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-900/10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center">
                                    <Bot className="text-white w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold">Create AI Employee</h2>
                                    <p className="text-xs text-slate-500">Step {step} of 2</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8">
                            {step === 1 ? (
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold mb-4">Choose a specialization</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            {TEMPLATES.map((t) => (
                                                <button
                                                    key={t.role}
                                                    onClick={() => selectTemplate(t)}
                                                    className="flex items-center p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-all text-left group"
                                                >
                                                    <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center mr-4 border border-slate-100 dark:border-slate-700">
                                                        <Sparkles className="w-6 h-6 text-indigo-500" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="font-bold text-slate-900 dark:text-white">{t.name} Assistant</p>
                                                        <p className="text-sm text-slate-500">{t.role}</p>
                                                    </div>
                                                    <Wand2 className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                                                </button>
                                            ))}
                                            <button
                                                onClick={() => setStep(2)}
                                                className="p-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 text-slate-400 hover:text-indigo-500 hover:border-indigo-500 transition-all font-medium text-center"
                                            >
                                                + Create from scratch
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Agent Name</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="e.g. Sales Hunter"
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Role Identification</label>
                                        <input
                                            required
                                            value={formData.role}
                                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                            placeholder="e.g. Lead Qualification Expert"
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Instruction (Prompt)</label>
                                            <button type="button" className="text-[10px] text-indigo-600 font-bold hover:underline">AI Help?</button>
                                        </div>
                                        <textarea
                                            required
                                            value={formData.prompt}
                                            onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
                                            rows={5}
                                            placeholder="You are an AI assistant for..."
                                            className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm resize-none"
                                        />
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="flex-1 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-sm hover:bg-slate-200"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none"
                                        >
                                            Summon Agent
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
