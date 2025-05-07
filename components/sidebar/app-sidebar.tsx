import { NavUser } from "@/components/sidebar/nav-user";
import { OrganizationsSwitcher } from "@/components/sidebar/organization-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import * as React from "react";
import { NavPlatform } from "./nav-platform";
import { NavSecondary } from "./nav-secondary";
import { SidebarCommand } from "./sidebar-command";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  slug: string;
};

export async function AppSidebar({ slug, ...props }: AppSidebarProps) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <OrganizationsSwitcher slug={slug} />
        <SidebarCommand />
        <NavPlatform slug={slug} />
      </SidebarHeader>
      <SidebarContent>{/* <NavWorkspaces /> */}</SidebarContent>
      <SidebarFooter>
        <NavSecondary className="mt-auto" />
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
