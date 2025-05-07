import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Switcher } from "./switcher";

export async function OrganizationsSwitcher({ slug }: { slug: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect("/signin");

  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  });

  await auth.api.setActiveOrganization({
    headers: await headers(),
    body: { organizationSlug: slug },
  });

  return <Switcher organizations={organizations} />;
}
