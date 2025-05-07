import { MainLayout } from "@/components/sidebar/main-layout";

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <MainLayout
      breadcrumbs={[
        { label: slug, href: `/organizations/${slug}` },
        { label: "Settings" },
      ]}
    >
      Settings - {slug}
    </MainLayout>
  );
}
