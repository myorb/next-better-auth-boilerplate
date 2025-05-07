"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { OrganizationAvatar } from "@/components/ui/organization-avatar";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { Organization } from "better-auth/plugins";
import { Check } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";

export function SwitcherItem({
  organization,
  activeOrganization,
  setIsLoading,
}: {
  organization: Organization;
  activeOrganization: Organization | null;
  setIsLoading: (loading: boolean) => void;
}) {
  const router = useRouter();

  const onSubmit = async (data: { organizationSlug: string }) => {
    try {
      setIsLoading(true);
      const { error } = await authClient.organization.setActive({
        organizationSlug: data.organizationSlug,
      });
      if (error) toast.error("Failed to switch organization");
    } catch (error) {
      console.error(error);
      toast.error("Failed to switch organization");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenuItem
      onClick={() => {
        onSubmit({ organizationSlug: organization.slug });
        router.replace(`${appConfig.authRoutes.default}/${organization.slug}`);
      }}
      className={cn(
        "gap-2 p-2",
        activeOrganization?.id === organization.id && "bg-accent"
      )}
    >
      <OrganizationAvatar orgId={organization.id} orgName={organization.name} />
      <TextEllipsis width={140}>{organization.name}</TextEllipsis>
      {activeOrganization?.id === organization.id && (
        <Check className="ml-auto size-4" />
      )}
    </DropdownMenuItem>
  );
}
