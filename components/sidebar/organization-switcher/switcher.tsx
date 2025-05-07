"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrganizationAvatar } from "@/components/ui/organization-avatar";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { authClient } from "@/lib/auth-client";
import { Organization } from "better-auth/plugins";
import { ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CreateOrganizationModal } from "./create-organization";
import { SwitcherItem } from "./switcher-item";

export function Switcher({ organizations }: { organizations: Organization[] }) {
  const params = useParams();
  const slug = params.slug as string;
  const [isLoading, setIsLoading] = useState(false);

  const { data: activeOrganization } = authClient.useActiveOrganization();

  useEffect(() => {
    const setActive = async () => {
      setIsLoading(true);
      try {
        await authClient.organization.setActive({ organizationSlug: slug });
      } catch (error) {
        console.error(error);
        toast.error("Failed to switch organization");
      } finally {
        setIsLoading(false);
      }
    };
    setActive();
  }, [slug]);

  const loadingActiveOrganization = isLoading;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {loadingActiveOrganization ? (
              <SidebarMenuSkeleton showIcon />
            ) : (
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
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>
            {/* <ScrollArea className="max-h-[250px] h-[200px]"> */}
            {organizations?.map((organization) => (
              <SwitcherItem
                key={organization.id}
                organization={organization}
                activeOrganization={activeOrganization}
                setIsLoading={setIsLoading}
              />
            ))}
            {/* </ScrollArea> */}
            <DropdownMenuSeparator />
            <CreateOrganizationModal />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
