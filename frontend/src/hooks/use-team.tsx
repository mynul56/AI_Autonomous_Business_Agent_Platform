"use client";

import React, { createContext, useContext, useState } from "react";

export type Role = "Owner" | "Admin" | "Member" | "Viewer";
export type Status = "Active" | "Invited";

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: Role;
    status: Status;
    joinedAt: string;
}

interface TeamContextType {
    members: TeamMember[];
    inviteMember: (member: Omit<TeamMember, "id" | "joinedAt" | "status">) => void;
    removeMember: (id: string) => void;
    updateRole: (id: string, role: Role) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

const INITIAL_MEMBERS: TeamMember[] = [
    { id: "1", name: "John Doe", email: "john@acme.com", role: "Owner", status: "Active", joinedAt: new Date().toISOString() },
    { id: "2", name: "Jane Smith", email: "jane@acme.com", role: "Admin", status: "Active", joinedAt: new Date().toISOString() },
    { id: "3", name: "Robert Wilson", email: "robert@acme.com", role: "Member", status: "Invited", joinedAt: new Date().toISOString() },
];

export function TeamProvider({ children }: { children: React.ReactNode }) {
    const [members, setMembers] = useState<TeamMember[]>(INITIAL_MEMBERS);

    const inviteMember = (data: Omit<TeamMember, "id" | "joinedAt" | "status">) => {
        const newMember: TeamMember = {
            ...data,
            id: Math.random().toString(36).substr(2, 9),
            status: "Invited",
            joinedAt: new Date().toISOString(),
        };
        setMembers((prev) => [...prev, newMember]);
    };

    const removeMember = (id: string) => {
        setMembers((prev) => prev.filter((m) => m.id !== id));
    };

    const updateRole = (id: string, role: Role) => {
        setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, role } : m)));
    };

    return (
        <TeamContext.Provider value={{ members, inviteMember, removeMember, updateRole }}>
            {children}
        </TeamContext.Provider>
    );
}

export function useTeam() {
    const context = useContext(TeamContext);
    if (context === undefined) {
        throw new Error("useTeam must be used within a TeamProvider");
    }
    return context;
}
