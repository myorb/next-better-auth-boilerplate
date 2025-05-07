"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { appConfig } from "@/constants/config";
import { Home, Settings, Users } from "lucide-react";
import Link from "next/link";

export function NavPlatform({ slug }: { slug: string }) {
  const items = [
    {
      id: "dashboard",
      title: "Dashboard",
      url: `${appConfig.authRoutes.default}/${slug}`,
      icon: Home,
      isActive: false,
    },
    {
      id: "members",
      title: "Members",
      url: `${appConfig.authRoutes.default}/${slug}/members`,
      icon: Users,
      isActive: false,
    },
    // {
    //   id: "domains",
    //   title: "Domains",
    //   url: "/domains",
    //   icon: Globe,
    //   isActive: false,
    // },
    // {
    //   id: "billing",
    //   title: "Billing",
    //   url: "/billing",
    //   icon: CreditCard,
    //   isActive: false,
    // },
    {
      id: "settings",
      title: "Settings",
      url: `${appConfig.authRoutes.default}/${slug}/settings`,
      icon: Settings,
      isActive: false,
    },
  ];

  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.id} id={item.id}>
          <SidebarMenuButton asChild isActive={item.isActive}>
            <Link href={item.url} prefetch>
              <item.icon />
              <span>{item.title}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
