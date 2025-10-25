import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OrganizationAction } from "./organization-action";
import { OrganizationCard } from "./organization-card";

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
          <OrganizationCard
            key={organization.id}
            organization={organization}
            memberCount={memberCountMap.get(organization.id) || 0}
          />
        ))}
      </div>
    </div>
  );
}
