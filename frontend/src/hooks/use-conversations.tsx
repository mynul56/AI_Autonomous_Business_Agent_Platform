"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useOrganization } from "./use-organization";

export interface Conversation {
    id: string;
    visitor_id: string;
    agent_id: string;
    last_message: string;
    status: string;
    organization_id: string;
    created_at: string;
}

interface ConversationContextType {
    conversations: Conversation[];
}

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export function ConversationProvider({ children }: { children: React.ReactNode }) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const { activeOrg } = useOrganization();

    const fetchConversations = async () => {
        if (!activeOrg) return;
        try {
            const response = await fetch(`http://localhost:8000/conversations/${activeOrg.id}`);
            if (response.ok) {
                const data = await response.json();
                setConversations(data);
            }
        } catch (error) {
            console.error("Failed to fetch conversations:", error);
        }
    };

    useEffect(() => {
        fetchConversations();
    }, [activeOrg]);

    return (
        <ConversationContext.Provider value={{ conversations }}>
            {children}
        </ConversationContext.Provider>
    );
}

export function useConversations() {
    const context = useContext(ConversationContext);
    if (context === undefined) {
        throw new Error("useConversations must be used within a ConversationProvider");
    }
    return context;
}
