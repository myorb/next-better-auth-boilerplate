import { MainLayout } from "@/components/sidebar/main-layout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function UserProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) redirect("/signin");

  return (
    <MainLayout breadcrumbs={[{ label: "Profile" }]}>
      <div>Profile</div>
    </MainLayout>
  );
}
