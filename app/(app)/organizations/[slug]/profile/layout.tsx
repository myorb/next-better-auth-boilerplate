"use client";

import { MainLayout } from "@/components/sidebar/main-layout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { appConfig } from "@/constants/config";
import { IconBrandOauth } from "@tabler/icons-react";
import { ChevronDown, Key, Monitor, Shield, Trash, Users2 } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React from "react";
import MainSectionArea from "./main-section-area";

const profileSectionNav: {
  key: string;
  name: string;
  description: string;
  icon: React.ElementType;
  href: string;
}[] = [
  {
    key: "personal-details",
    name: "Personal Details",
    description: "Manage your personal details and preferences",
    icon: Users2,
    href: "/profile/personal-details",
  },
  {
    key: "security",
    name: "Security",
    description: "Manage your security settings",
    icon: Shield,
    href: "/profile/security",
  },
  {
    key: "providers",
    name: "Providers",
    description: "Manage your accounts with third-party providers.",
    icon: IconBrandOauth,
    href: "/profile/providers",
  },
  {
    key: "api-keys",
    name: "API Keys",
    description: "Manage your API keys",
    icon: Key,
    href: "/profile/api-keys",
  },
  {
    key: "active-sessions",
    name: "Active Sessions",
    description: "Manage your active sessions and revoke access.",
    icon: Monitor,
    href: "/profile/active-sessions",
  },
  {
    key: "danger-zone",
    name: "Danger Zone",
    description: "Delete your account",
    icon: Trash,
    href: "/profile/danger-zone",
  },
];

export default function ProfileLayout({
  sections,
}: {
  sections: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const activeItem = profileSectionNav.find(
    (item) => item.key === pathname.split("/").pop()
  );

  return (
    <MainLayout breadcrumbs={[{ label: "Profile" }]}>
      <SidebarProvider className="flex flex-col md:flex-row min-h-[calc(100vh-2rem)]">
        <Sidebar collapsible="none" className="hidden md:flex rounded-lg">
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {profileSectionNav.map((item) => (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton
                        isActive={item.key === activeItem?.key}
                        onClick={() =>
                          router.push(
                            `${appConfig.authRoutes.default}/${slug}/${item.href}`
                          )
                        }
                      >
                        <item.icon />
                        <span>{item.name}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="flex md:hidden mb-4 mt-2">
            <Button variant="outline" className="w-fit self-end">
              {activeItem?.name}
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            {profileSectionNav.map((item) => (
              <DropdownMenuItem
                key={item.key}
                onClick={() =>
                  router.push(
                    `${appConfig.authRoutes.default}/${slug}/${item.href}`
                  )
                }
              >
                <item.icon />
                <span>{item.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <MainSectionArea sections={sections} />
      </SidebarProvider>
    </MainLayout>
  );
}
