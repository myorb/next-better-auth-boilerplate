"use client";

import { setActiveOrganizationAction } from "@/actions/organizations";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { OrganizationAvatar } from "@/components/ui/organization-avatar";
import { appConfig } from "@/constants/config";
import { Organization } from "better-auth/plugins/organization";
import { ArrowRightIcon, UsersRound } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";

export function OrganizationCard({
  organization,
  memberCount,
}: {
  organization: Organization;
  memberCount: number;
}) {
  const setActiveOrganization = useAction(setActiveOrganizationAction);

  return (
    <Link
      href={`${appConfig.authRoutes.default}/${organization.slug}`}
      key={organization.id}
      onClick={() => {
        setActiveOrganization.execute({
          slug: organization.slug,
          id: organization.id,
        });
      }}
      className="transition-all duration-200 group"
    >
      <Card className="h-full overflow-hidden border border-border/50 group-hover:border-primary/20 group-hover:shadow-md transition-all duration-200">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3">
            <OrganizationAvatar
              orgId={organization.id}
              orgName={organization.name}
              size="lg"
              shape="square"
              border
            />
            <div className="flex-1 min-w-0">
              <CardTitle className="text-xl group-hover:text-primary transition-colors">
                {organization.name}
              </CardTitle>
              <CardDescription className="flex items-center">
                {organization.slug}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-2 pb-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className="flex items-center gap-1">
              <UsersRound size={12} />
              <span>{memberCount} members</span>
            </Badge>
            <span className="text-sm text-muted-foreground flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              View dashboard
              <ArrowRightIcon
                size={14}
                className="ml-1 group-hover:translate-x-1 transition-transform"
              />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
