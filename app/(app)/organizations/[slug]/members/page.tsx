import { MainLayout } from "@/components/sidebar/main-layout";
import { appConfig } from "@/constants/config";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <MainLayout
      breadcrumbs={[
        {
          label: "Members",
          href: `${appConfig.authRoutes.default}/${slug}/members`,
        },
      ]}
    >
      Members - {slug}
    </MainLayout>
  );
}
