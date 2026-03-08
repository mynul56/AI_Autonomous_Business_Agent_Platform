"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useOrganization } from "./use-organization";

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
    addAgent: (agent: Omit<Agent, "id" | "createdAt" | "status">) => Promise<void>;
    deleteAgent: (id: string) => Promise<void>;
    updateAgent: (id: string, agent: Partial<Agent>) => Promise<void>;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export function AgentProvider({ children }: { children: React.ReactNode }) {
    const [agents, setAgents] = useState<Agent[]>([]);
    const { activeOrg } = useOrganization();

    const fetchAgents = async () => {
        if (!activeOrg) return;
        try {
            const response = await fetch(`http://localhost:8000/agents/${activeOrg.id}`);
            if (response.ok) {
                const data = await response.json();
                setAgents(data);
            }
        } catch (error) {
            console.error("Failed to fetch agents:", error);
        }
    };

    useEffect(() => {
        fetchAgents();
    }, [activeOrg]);

    const addAgent = async (agentData: Omit<Agent, "id" | "createdAt" | "status">) => {
        if (!activeOrg) return;
        try {
            const response = await fetch("http://localhost:8000/agents/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...agentData, organization_id: activeOrg.id }),
            });
            if (response.ok) {
                fetchAgents();
            }
        } catch (error) {
            console.error("Failed to add agent:", error);
        }
    };

    const deleteAgent = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8000/agents/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchAgents();
            }
        } catch (error) {
            console.error("Failed to delete agent:", error);
        }
    };

    const updateAgent = async (id: string, agentData: Partial<Agent>) => {
        // Implement backend update if needed, otherwise just optimistic update
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
