"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useOrganization } from "./use-organization";

export interface KnowledgeItem {
    id: string;
    name: string;
    type: string;
    size?: string;
    organization_id: string;
    createdAt: string;
}

interface KnowledgeContextType {
    items: KnowledgeItem[];
    addItem: (item: Omit<KnowledgeItem, "id" | "createdAt">) => Promise<void>;
    removeItem: (id: string) => Promise<void>;
}

const KnowledgeContext = createContext<KnowledgeContextType | undefined>(undefined);

export function KnowledgeProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<KnowledgeItem[]>([]);
    const { activeOrg } = useOrganization();

    const fetchItems = async () => {
        if (!activeOrg) return;
        try {
            const response = await fetch(`http://localhost:8000/knowledge/${activeOrg.id}`);
            if (response.ok) {
                const data = await response.json();
                setItems(data);
            }
        } catch (error) {
            console.error("Failed to fetch knowledge items:", error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [activeOrg]);

    const addItem = async (itemData: Omit<KnowledgeItem, "id" | "createdAt">) => {
        if (!activeOrg) return;
        try {
            const response = await fetch("http://localhost:8000/knowledge/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...itemData, organization_id: activeOrg.id }),
            });
            if (response.ok) {
                fetchItems();
            }
        } catch (error) {
            console.error("Failed to add knowledge item:", error);
        }
    };

    const removeItem = async (id: string) => {
        try {
            const response = await fetch(`http://localhost:8000/knowledge/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                fetchItems();
            }
        } catch (error) {
            console.error("Failed to remove knowledge item:", error);
        }
    };

    return (
        <KnowledgeContext.Provider value={{ items, addItem, removeItem }}>
            {children}
        </KnowledgeContext.Provider>
    );
}

export function useKnowledge() {
    const context = useContext(KnowledgeContext);
    if (context === undefined) {
        throw new Error("useKnowledge must be used within a KnowledgeProvider");
    }
    return context;
}
