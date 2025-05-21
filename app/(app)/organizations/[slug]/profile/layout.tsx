"use client";

import { MainLayout } from "@/components/sidebar/main-layout";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Skeleton } from "@/components/ui/skeleton";
import { appConfig } from "@/constants/config";
import { IconBrandOauth } from "@tabler/icons-react";
import { Key, Monitor, Shield, Trash, Users2 } from "lucide-react";
import { useParams, usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React, { Suspense } from "react";

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
    key: "delete-zone",
    name: "Delete Zone",
    description: "Delete your account",
    icon: Trash,
    href: "/profile/delete-zone",
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
      <SidebarProvider className="flex flex-col md:flex-row min-h-[100vh-2rem]">
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
        <main className="flex flex-1 flex-col overflow-hidden gap-4 px-0 md:px-4">
          <ScrollArea className="flex flex-1 flex-col gap-4 h-[calc(100vh-10rem)]">
            <Suspense
              fallback={
                <div className="flex flex-col gap-4">
                  <Skeleton className="h-40" />
                  <Skeleton className="h-40" />
                </div>
              }
            >
              {sections}
            </Suspense>
          </ScrollArea>
        </main>
      </SidebarProvider>
    </MainLayout>
  );
}
