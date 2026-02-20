"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Building2, Plus, Users, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Organization } from "better-auth/plugins";
import { useParams, useRouter } from "next/navigation";
import { OrganizationAvatar } from "@/components/ui/organization-avatar";
import { appConfig } from "@/constants/config"
import { CreateOrgModal } from "./create-org-modal"
import { setActiveOrganizationAction } from "@/actions/organizations"
import { useAction } from "next-safe-action/hooks"

interface OrgSwitcherProps {
  organizations: Organization[]
}

export function OrgSwitcher({ organizations }: OrgSwitcherProps) {
  const setActiveOrganization = useAction(setActiveOrganizationAction);
  
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const [open, setOpen] = useState(false)

  const activeOrganization = organizations.find(
    (organization) => organization.slug === slug
  );

  const roleColors = {
    company_owner: "bg-purple-500",
    manager: "bg-blue-500",
    chief: "bg-green-500",
    staff: "bg-gray-500",
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between h-auto py-3 px-3 bg-transparent"
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <OrganizationAvatar
              size="lg"
              orgId={activeOrganization?.id ?? ""}
              orgName={activeOrganization?.name ?? ""}
            />
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="text-md font-medium truncate w-full flex">{activeOrganization?.name}</span>
              <Badge variant="secondary" className="text-xs mt-1">
                {/* {activeOrganization?.role} */}
              </Badge>
            </div>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[260px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search company..." />
          <CommandList>
            <CommandEmpty>No company found.</CommandEmpty>
            <CommandGroup heading="Your Companies">
              {organizations.map((organization) => (
                <CommandItem
                  key={organization.id}
                  value={organization.name}
                  className="cursor-pointer"
                  onSelect={() => {
                    if (activeOrganization?.id === organization.id) return;
                    setActiveOrganization.execute({
                      slug: organization.slug,
                      id: organization.id,
                    });
                    router.replace(
                      `${appConfig.authRoutes.default}/${organization.slug}`
                    );
                  }}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <OrganizationAvatar
                      orgId={organization.id}
                      orgName={organization.name}
                    />
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-medium truncate">{organization.name}</span>
                      {/* <span className="text-xs text-muted-foreground">{role}</span> */}
                    </div>
                    {activeOrganization?.id === organization.id && (
                      <Check className="ml-auto size-4 text-primary" />
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>

              <CommandItem >
                <Link
                  href={`${appConfig.authRoutes.default}/${slug}/members`}
                  prefetch
                  className="flex items-center gap-2"
                >
                  <Users />
                  <span>Members</span>
                </Link>
              </CommandItem>
              <CommandItem >
                <Link
                  href={`${appConfig.authRoutes.default}/${slug}/settings`}
                  prefetch
                  className="flex items-center gap-2"
                >
                  <Settings />
                  <span>Settings</span>
                </Link>
              </CommandItem>

              <CommandSeparator />

              <CommandItem asChild>
                <CreateOrgModal />
              </CommandItem>

            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
