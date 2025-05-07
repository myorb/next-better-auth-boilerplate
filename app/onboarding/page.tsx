import { CreateOrganizationForm } from "@/components/create-organization-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { IconFlowerFilled } from "@tabler/icons-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const data = await auth.api.getSession({
    headers: await headers(),
  });
  if (!data) redirect("/signin");

  const organization = await auth.api.listOrganizations({
    headers: await headers(),
    query: {
      userId: data.session.userId,
    },
  });

  if (organization.length > 0) {
    const activeOrganization =
      organization.find(
        (org) => org.id === data.session.activeOrganizationId
      ) ?? organization[0];
    if (activeOrganization) {
      await auth.api.setActiveOrganization({
        headers: await headers(),
        body: { organizationId: activeOrganization.id },
      });
      redirect(`/organizations/${activeOrganization.id}`);
    }
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-sm relative">
        <CardHeader className="shadow-xs border-none bg-transparent">
          <div className="flex flex-col items-center text-center gap-2">
            <IconFlowerFilled className="w-10 h-10" />
            <CardTitle className="text-xl font-semibold">
              Create your organization
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Create your organization to get started
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CreateOrganizationForm
            onSuccess={(organization) =>
              redirect(`/organizations/${organization.id}`)
            }
          />
        </CardContent>
      </Card>
    </div>
  );
}
