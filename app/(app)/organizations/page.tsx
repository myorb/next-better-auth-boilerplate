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
import { auth } from "@/lib/auth";
import { ArrowRightIcon, UsersRound } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { OrganizationAction } from "./organization-action";

export default async function OrganizationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/signin");

  const organizations = await auth.api.listOrganizations({
    query: { userId: session.user.id, member: true },
    headers: await headers(),
  });

  // Get member counts for each organization
  const memberCounts = await Promise.all(
    organizations.map(async (org) => {
      const result = await auth.api.getFullOrganization({
        query: { organizationId: org.id },
        headers: await headers(),
      });
      return { orgId: org.id, count: result?.members.length || 0 };
    })
  );

  // Create a map for quick lookup
  const memberCountMap = new Map(
    memberCounts.map((item) => [item.orgId, item.count])
  );

  return (
    <div className="flex flex-col gap-6 h-svh max-w-3xl mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Your Organizations
          </h1>
          <p className="text-md text-muted-foreground">
            Select an organization to access its dashboard
          </p>
        </div>
        <OrganizationAction />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {organizations.map((organization) => (
          <Link
            href={`${appConfig.authRoutes.default}/${organization.slug}`}
            key={organization.id}
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
                      {`/${organization.slug}`}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-2 pb-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="flex items-center gap-1">
                    <UsersRound size={12} />
                    <span>
                      {memberCountMap.get(organization.id) || 1} members
                    </span>
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
        ))}
      </div>
    </div>
  );
}
