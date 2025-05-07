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
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { authClient } from "@/lib/auth-client";
import { Organization } from "better-auth/plugins";
import { ChevronDown } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { toast } from "sonner";
import { CreateOrganizationModal } from "./create-organization";
export function Switcher({ organizations }: { organizations: Organization[] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    data: activeOrganization,
    isRefetching,
    isPending,
    refetch,
  } = authClient.useActiveOrganization();

  const onSubmit = async (data: { organizationSlug: string }) => {
    try {
      setIsLoading(true);
      const { error } = await authClient.organization.setActive({
        organizationSlug: data.organizationSlug,
      });
      if (error) toast.error("Failed to switch organization");
      else {
        toast.success("Switched organization");
        refetch();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isLoading || isRefetching || isPending ? (
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
            {organizations?.map((organization, index) => (
              <DropdownMenuItem
                key={organization.id}
                onClick={() => {
                  onSubmit({ organizationSlug: organization.slug });
                  router.replace(`/organizations/${organization.slug}`);
                }}
                className="gap-2 p-2"
              >
                <OrganizationAvatar
                  orgId={organization.id}
                  orgName={organization.name}
                />
                <TextEllipsis width={140}>{organization.name}</TextEllipsis>
              </DropdownMenuItem>
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
