"use client";

import {
  ChevronRight,
  CreditCard,
  User,
  type LucideIcon
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

const items: {
  title: string;
  url: string;
  icon?: LucideIcon;
  isActive?: boolean;
  isNested?: boolean;
  items?: { title: string; url: string }[];
}[] = [
  {
    title: "Account",
    url: "/settings/profile",
    icon: User,
    isActive: true,
    isNested: false,
    items: [],
  },
  {
    title: "Subscriptions",
    url: "/settings/subscriptions",
    icon: CreditCard,
    isActive: false,
    isNested: false,
    items: [],
  },
];

export function NavSettings() {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (url: string) => pathname.includes(url);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Settings</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={isActive(item.url)}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => {
                    router.push(item.url);
                  }}
                  className={cn(isActive(item.url) && "bg-muted")}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  {item.isNested && (
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              {item.isNested && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem?.title}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem?.url}>
                            <span>{subItem?.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
