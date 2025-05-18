"use client";

import { setActiveOrganization } from "@/actions/organizations";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { OrganizationAvatar } from "@/components/ui/organization-avatar";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { appConfig } from "@/constants/config";
import { cn } from "@/lib/utils";
import { Organization } from "better-auth/plugins";
import { Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";

export function SwitcherItem({
  organization,
  activeOrganizationId,
}: {
  organization: Organization;
  activeOrganizationId: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const pathAfterSlug = pathname.split("/").slice(3).join("/");

  const onSubmit = async () => {
    try {
      const { error } = await setActiveOrganization(organization.slug);
      if (error) toast.error("Failed to switch organization");
    } catch (error) {
      console.error(error);
      toast.error("Failed to switch organization");
    }
  };

  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.preventDefault();
        if (activeOrganizationId === organization.id) return;
        onSubmit();
        router.replace(
          `${appConfig.authRoutes.default}/${organization.slug}/${pathAfterSlug}`
        );
      }}
      className={cn(
        "gap-2 p-2",
        activeOrganizationId === organization.id && "bg-accent"
      )}
    >
      <OrganizationAvatar
        orgId={organization.id}
        orgName={organization.name}
        className="size-8"
      />
      <div className="flex flex-col">
        <TextEllipsis width={140}>{organization.name}</TextEllipsis>
        <TextEllipsis width={140} className="text-[11px] text-muted-foreground">
          {organization.slug}
        </TextEllipsis>
      </div>
      {activeOrganizationId === organization.id && (
        <Check className="ml-auto size-4" />
      )}
    </DropdownMenuItem>
  );
}
