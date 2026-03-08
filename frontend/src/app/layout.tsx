import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { OrganizationProvider } from "@/hooks/use-organization";
import { AgentProvider } from "@/hooks/use-agents";
import { TeamProvider } from "@/hooks/use-team";
import { KnowledgeProvider } from "@/hooks/use-knowledge";
import { ConversationProvider } from "@/hooks/use-conversations";
import { WorkflowProvider } from "@/hooks/use-workflows";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Antigravity | AI Business Agent Platform",
  description: "Deploy autonomous AI agents for your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrganizationProvider>
          <AgentProvider>
            <TeamProvider>
              <KnowledgeProvider>
                <ConversationProvider>
                  <WorkflowProvider>
                    {children}
                  </WorkflowProvider>
                </ConversationProvider>
              </KnowledgeProvider>
            </TeamProvider>
          </AgentProvider>
        </OrganizationProvider>
      </body>
    </html>
  );
}
