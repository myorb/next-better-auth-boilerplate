"use client";

import { setActiveOrganizationAction } from "@/actions/organizations";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { OrganizationAvatar } from "@/components/ui/organization-avatar";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { appConfig } from "@/constants/config";
import { cn } from "@/lib/utils";
import { Organization } from "better-auth/plugins";
import { Check } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";

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

  const setActiveOrganization = useAction(setActiveOrganizationAction);

  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.preventDefault();
        if (activeOrganizationId === organization.id) return;
        setActiveOrganization.execute({
          slug: organization.slug,
          id: organization.id,
        });
        router.replace(
          `${appConfig.authRoutes.default}/${organization.slug}/${pathAfterSlug}`
        );
      }}
      className={cn(
        "gap-2 p-2 cursor-pointer",
        activeOrganizationId === organization.id && "bg-accent"
      )}
    >
      <OrganizationAvatar
        orgId={organization.id}
        orgName={organization.name}
        className="size-5"
      />
      <div className="flex flex-col">
        <TextEllipsis width={140}>{organization.name}</TextEllipsis>
      </div>
      {activeOrganizationId === organization.id && (
        <Check className="ml-auto size-4 text-primary" />
      )}
    </DropdownMenuItem>
  );
}
