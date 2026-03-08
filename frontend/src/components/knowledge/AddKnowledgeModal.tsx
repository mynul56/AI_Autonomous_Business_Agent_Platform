"use client";
import React from "react";
import { X, Globe, FileUp, Sparkles, Link2 } from "lucide-react";
import { useKnowledge } from "@/hooks/use-knowledge";
import { motion, AnimatePresence } from "framer-motion";

interface AddKnowledgeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddKnowledgeModal({ isOpen, onClose }: AddKnowledgeModalProps) {
    const { addItem } = useKnowledge();
    const [type, setType] = React.useState<"URL" | "File" | null>(null);
    const [formData, setFormData] = React.useState({
        name: "",
        url: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addItem({
            name: type === "URL" ? formData.url : formData.name,
            type: type || "URL",
            size: type === "File" ? "1.2MB" : undefined,
        });
        setFormData({ name: "", url: "" });
        setType(null);
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
                                    <Globe className="text-white w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-bold">Add Knowledge</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8">
                            {!type ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => setType("URL")}
                                        className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all flex flex-col items-center gap-3 group"
                                    >
                                        <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                            <Link2 className="w-6 h-6 text-indigo-500" />
                                        </div>
                                        <span className="font-bold text-sm">Add URL</span>
                                    </button>
                                    <button
                                        onClick={() => setType("File")}
                                        className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all flex flex-col items-center gap-3 group"
                                    >
                                        <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                            <FileUp className="w-6 h-6 text-indigo-500" />
                                        </div>
                                        <span className="font-bold text-sm">Upload File</span>
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                                            {type === "URL" ? "Website URL" : "File Name"}
                                        </label>
                                        <input
                                            required
                                            value={type === "URL" ? formData.url : formData.name}
                                            onChange={(e) => setFormData({ ...formData, [type === "URL" ? "url" : "name"]: e.target.value })}
                                            placeholder={type === "URL" ? "https://example.com" : "Project Specs.pdf"}
                                            className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-none outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        />
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setType(null)}
                                            className="flex-1 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 font-bold text-sm hover:bg-slate-200"
                                        >
                                            Back
                                        </button>
                                        <button
                                            type="submit"
                                            className="flex-1 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 shadow-lg"
                                        >
                                            Add Resource
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
