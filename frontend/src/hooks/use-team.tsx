import React, { createContext, useContext, useState } from "react";
import { useOrganization } from "./use-organization";

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
    inviteMember: (member: Omit<TeamMember, "id" | "joinedAt" | "status">) => Promise<void>;
    removeMember: (id: string) => Promise<void>;
    updateRole: (id: string, role: Role) => Promise<void>;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export function TeamProvider({ children }: { children: React.ReactNode }) {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const { activeOrg } = useOrganization();

    const fetchMembers = async () => {
        if (!activeOrg) return;
        try {
            const response = await fetch(`http://localhost:8000/members/${activeOrg.id}`);
            if (response.ok) {
                const data = await response.json();
                // Map membership to team member UI model
                // Note: In a real app, membership model should join with user model
                // For now, we'll assume membership has user details if we join it
                setMembers(data.map((m: any) => ({
                    id: m.user_id,
                    name: "User " + m.user_id.substring(0, 4), // Placeholder since we don't join yet
                    email: "user@example.com",
                    role: m.role as Role,
                    status: "Active",
                    joinedAt: m.created_at
                })));
            }
        } catch (error) {
            console.error("Failed to fetch members:", error);
        }
    };

    React.useEffect(() => {
        fetchMembers();
    }, [activeOrg]);

    const inviteMember = async (data: Omit<TeamMember, "id" | "joinedAt" | "status">) => {
        // Placeholder for inviting (creating membership)
        console.log("Inviting member:", data);
    };

    const removeMember = async (id: string) => {
        if (!activeOrg) return;
        try {
            const response = await fetch(`http://localhost:8000/members/${activeOrg.id}/${id}`, {
                method: "DELETE"
            });
            if (response.ok) fetchMembers();
        } catch (error) {
            console.error("Failed to remove member:", error);
        }
    };

    const updateRole = async (id: string, role: Role) => {
        if (!activeOrg) return;
        try {
            const response = await fetch(`http://localhost:8000/members/${activeOrg.id}/${id}?role=${role}`, {
                method: "PUT"
            });
            if (response.ok) fetchMembers();
        } catch (error) {
            console.error("Failed to update role:", error);
        }
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
