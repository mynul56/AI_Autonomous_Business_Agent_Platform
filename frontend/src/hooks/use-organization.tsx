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
    const [organizations, setOrganizations] = useState<Organization[]>([]);
    const [activeOrg, setActiveOrg] = useState<Organization | null>(null);

    const fetchOrganizations = async () => {
        try {
            const response = await fetch("http://localhost:8000/organizations/");
            if (response.ok) {
                const data = await response.json();
                setOrganizations(data);
                if (data.length > 0 && !activeOrg) {
                    setActiveOrg(data[0]);
                }
            }
        } catch (error) {
            console.error("Failed to fetch organizations:", error);
        }
    };

    useEffect(() => {
        fetchOrganizations();
    }, []);

    const createOrg = async (name: string) => {
        try {
            const response = await fetch("http://localhost:8000/organizations/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name }),
            });
            if (response.ok) {
                const newOrg = await response.json();
                setOrganizations((prev) => [...prev, newOrg]);
                setActiveOrg(newOrg);
            }
        } catch (error) {
            console.error("Failed to create organization:", error);
        }
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
