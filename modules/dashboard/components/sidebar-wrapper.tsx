"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export function SidebarWrapper({
    children,
    defaultOpen = true,
}: {
    children: React.ReactNode
    defaultOpen?: boolean
}) {
    return <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
}