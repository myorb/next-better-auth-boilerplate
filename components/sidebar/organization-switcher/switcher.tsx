"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Organization } from "better-auth/plugins";
import { ChevronDown } from "lucide-react";
import { useParams } from "next/navigation";
import { SwitcherItem } from "./switcher-item";

export function Switcher({ organizations }: { organizations: Organization[] }) {
  const params = useParams();
  const slug = params.slug as string;

  const activeOrganization = organizations.find(
    (organization) => organization.slug === slug
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 w-full">
        <span>Switch Organization</span>
        <ChevronDown className="ml-auto size-4" />
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
            activeOrganizationId={activeOrganization?.id ?? ""}
          />
        ))}
        {/* </ScrollArea> */}
        {/* <DropdownMenuSeparator /> */}
        {/* <CreateOrganizationModal /> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
