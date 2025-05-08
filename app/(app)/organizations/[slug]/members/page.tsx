import { MainLayout } from "@/components/sidebar/main-layout";
import { auth } from "@/lib/auth";
import { OrganizationRelations } from "@/types/organizations";
import { headers } from "next/headers";
import { MembersView } from "./members-view";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const organization = (await auth.api.getFullOrganization({
    query: { organizationSlug: slug },
    headers: await headers(),
  })) as OrganizationRelations;

  return (
    <MainLayout breadcrumbs={[{ label: "Members" }]}>
      <MembersView organization={organization} />
    </MainLayout>
  );
}
