import { appConfig } from "@/constants/config";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { OrgSwitcher } from "./org-switcher";

export async function OrganizationSwitcher() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) redirect(appConfig.authRoutes.signin);

  const organizations = await auth.api.listOrganizations({
    headers: await headers(),
  });

  return <OrgSwitcher organizations={organizations} />;
}
