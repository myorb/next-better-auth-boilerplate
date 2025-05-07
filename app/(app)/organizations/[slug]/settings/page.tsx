import { MainLayout } from "@/components/sidebar/main-layout";
import { appConfig } from "@/constants/config";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <MainLayout
      breadcrumbs={[
        { label: slug, href: `${appConfig.authRoutes.default}/${slug}` },
        { label: "Settings" },
      ]}
    >
      Settings - {slug}
    </MainLayout>
  );
}
