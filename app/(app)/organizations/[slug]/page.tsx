import { MainLayout } from "@/components/sidebar/main-layout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/signin");

  return (
    <MainLayout breadcrumbs={[{ label: slug }]}>
      <div className="flex flex-col">
        <p className="text-3xl font-semibold">
          Welcome back, {session.user.name}!
        </p>
        <p className="text-sm text-muted-foreground">
          You are currently in the <code className="font-semibold">{slug}</code>{" "}
          organization.
        </p>
      </div>
    </MainLayout>
  );
}
