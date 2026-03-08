"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { useOrganization } from "./use-organization";

export interface Workflow {
    id: string;
    title: string;
    trigger: string;
    action: string;
    color: string;
    last_triggered?: string;
    organization_id: string;
    created_at: string;
}

interface WorkflowContextType {
    workflows: Workflow[];
    addWorkflow: (workflow: Omit<Workflow, "id" | "created_at" | "last_triggered" | "organization_id">) => Promise<void>;
    deleteWorkflow: (id: string) => Promise<void>;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(undefined);

export function WorkflowProvider({ children }: { children: React.ReactNode }) {
    const [workflows, setWorkflows] = useState<Workflow[]>([]);
    const { activeOrg } = useOrganization();

    const fetchWorkflows = async () => {
        if (!activeOrg) return;
        try {
            const response = await fetch(`http://localhost:8000/workflows/${activeOrg.id}`);
            if (response.ok) {
                const data = await response.json();
                setWorkflows(data);
            }
        } catch (error) {
            console.error("Failed to fetch workflows:", error);
        }
    };

    useEffect(() => {
        fetchWorkflows();
    }, [activeOrg]);

    const addWorkflow = async (workflowData: Omit<Workflow, "id" | "created_at" | "last_triggered" | "organization_id">) => {
        if (!activeOrg) return;
        try {
            const response = await fetch("http://localhost:8000/workflows/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...workflowData, organization_id: activeOrg.id }),
            });
            if (response.ok) {
                fetchWorkflows();
            }
        } catch (error) {
            console.error("Failed to add workflow:", error);
        }
    };

    const deleteWorkflow = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8000/workflows/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchWorkflows();
            }
        } catch (error) {
            console.error("Failed to delete workflow:", error);
        }
    };

    return (
        <WorkflowContext.Provider value={{ workflows, addWorkflow, deleteWorkflow }}>
            {children}
        </WorkflowContext.Provider>
    );
}

export function useWorkflows() {
    const context = useContext(WorkflowContext);
    if (context === undefined) {
        throw new Error("useWorkflows must be used within a WorkflowProvider");
    }
    return context;
}
