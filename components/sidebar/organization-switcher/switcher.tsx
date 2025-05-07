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
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Organization } from "better-auth/plugins";
import { Check, ChevronDown } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CreateOrganizationModal } from "./create-organization";

export function Switcher({
  organizations,
  slug,
}: {
  organizations: Organization[];
  slug: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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

  const {
    data: activeOrganization,
    isRefetching,
    refetch,
  } = authClient.useActiveOrganization();

  const onSubmit = async (data: { organizationSlug: string }) => {
    try {
      setIsLoading(true);
      const { error } = await authClient.organization.setActive({
        organizationSlug: data.organizationSlug,
      });
      if (error) toast.error("Failed to switch organization");
      else refetch();
    } catch (error) {
      console.error(error);
      toast.error("Failed to switch organization");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            {isLoading || isRefetching ? (
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
                  router.replace(
                    `${appConfig.authRoutes.default}/${organization.slug}`
                  );
                }}
                className={cn(
                  "gap-2 p-2",
                  activeOrganization?.id === organization.id && "bg-accent"
                )}
              >
                <OrganizationAvatar
                  orgId={organization.id}
                  orgName={organization.name}
                />
                <TextEllipsis width={140}>{organization.name}</TextEllipsis>
                {activeOrganization?.id === organization.id && (
                  <Check className="ml-auto size-4" />
                )}
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
