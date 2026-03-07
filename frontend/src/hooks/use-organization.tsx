"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface Organization {
    id: string;
    name: string;
}

interface OrganizationContextType {
    activeOrg: Organization | null;
    organizations: Organization[];
    setActiveOrg: (org: Organization) => void;
    createOrg: (name: string) => Promise<void>;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export function OrganizationProvider({ children }: { children: React.ReactNode }) {
    const [organizations, setOrganizations] = useState<Organization[]>([
        { id: "1", name: "ACME Corp" },
        { id: "2", name: "Stark Industries" },
    ]);
    const [activeOrg, setActiveOrg] = useState<Organization | null>(organizations[0]);

    const createOrg = async (name: string) => {
        // In future, this will call the FastAPI backend
        const newOrg = { id: Math.random().toString(), name };
        setOrganizations([...organizations, newOrg]);
        setActiveOrg(newOrg);
    };

    return (
        <OrganizationContext.Provider value={{ activeOrg, organizations, setActiveOrg, createOrg }}>
            {children}
        </OrganizationContext.Provider>
    );
}

export function useOrganization() {
    const context = useContext(OrganizationContext);
    if (context === undefined) {
        throw new Error("useOrganization must be used within an OrganizationProvider");
    }
    return context;
}
