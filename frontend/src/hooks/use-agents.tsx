"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Agent {
    id: string;
    name: string;
    role: string;
    prompt: string;
    status: "Active" | "Idle";
    createdAt: string;
}

interface AgentContextType {
    agents: Agent[];
    addAgent: (agent: Omit<Agent, "id" | "createdAt" | "status">) => void;
    deleteAgent: (id: string) => void;
    updateAgent: (id: string, agent: Partial<Agent>) => void;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

const INITIAL_AGENTS: Agent[] = [
    { id: "1", name: "Sales Assistant", role: "Lead Qualification", prompt: "You are a sales assistant...", status: "Active", createdAt: new Date().toISOString() },
    { id: "2", name: "Support Bot", role: "Customer Support (Web)", prompt: "You are a customer support agent...", status: "Active", createdAt: new Date().toISOString() },
    { id: "3", name: "Content Planner", role: "Social Marketing", prompt: "You are a marketing strategist...", status: "Idle", createdAt: new Date().toISOString() },
];

export function AgentProvider({ children }: { children: React.ReactNode }) {
    const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);

    const addAgent = (agentData: Omit<Agent, "id" | "createdAt" | "status">) => {
        const newAgent: Agent = {
            ...agentData,
            id: Math.random().toString(36).substr(2, 9),
            status: "Idle",
            createdAt: new Date().toISOString(),
        };
        setAgents((prev) => [newAgent, ...prev]);
    };

    const deleteAgent = (id: string) => {
        setAgents((prev) => prev.filter((a) => a.id !== id));
    };

    const updateAgent = (id: string, agentData: Partial<Agent>) => {
        setAgents((prev) => prev.map((a) => (a.id === id ? { ...a, ...agentData } : a)));
    };

    return (
        <AgentContext.Provider value={{ agents, addAgent, deleteAgent, updateAgent }}>
            {children}
        </AgentContext.Provider>
    );
}

export function useAgents() {
    const context = useContext(AgentContext);
    if (context === undefined) {
        throw new Error("useAgents must be used within an AgentProvider");
    }
    return context;
}
