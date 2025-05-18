"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrganizationAvatar } from "@/components/ui/organization-avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { appConfig } from "@/constants/config";
import { IconSwitch2 } from "@tabler/icons-react";
import { Organization } from "better-auth/plugins";
import { ChevronDown, Settings, Users } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { CreateOrganizationModal } from "./create-organization";
import { Switcher } from "./switcher";

export function OrganizationDropdown({
  organizations,
}: {
  organizations: Organization[];
}) {
  const params = useParams();
  const slug = params.slug as string;

  const activeOrganization = organizations.find(
    (organization) => organization.slug === slug
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5">
              <OrganizationAvatar
                orgId={activeOrganization?.id ?? ""}
                orgName={activeOrganization?.name ?? ""}
              />
              <span className="truncate font-semibold">
                <TextEllipsis width={140}>
                  {activeOrganization?.name ?? ""}
                </TextEllipsis>
              </span>
              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuItem className="flex items-center gap-2">
              <OrganizationAvatar
                orgId={activeOrganization?.id ?? ""}
                orgName={activeOrganization?.name ?? ""}
              />
              <span className="truncate font-semibold">
                {activeOrganization?.name ?? ""}
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`${appConfig.authRoutes.default}/${slug}/members`}
                prefetch
                className="flex items-center gap-2"
              >
                <Users />
                <span>Members</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`${appConfig.authRoutes.default}/${slug}/settings`}
                prefetch
                className="flex items-center gap-2"
              >
                <Settings />
                <span>Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <IconSwitch2 />
              <Switcher organizations={organizations} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <CreateOrganizationModal />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
