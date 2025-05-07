"use client";

import { HelpCircle } from "lucide-react";
import React from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavSecondary({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  return (
    <SidebarMenu>
      <SidebarMenuItem key={"how-it-works"}>
        <SidebarMenuButton className="cursor-pointer">
          <HelpCircle />
          <span>How it works</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
