import { MainLayout } from "@/components/sidebar/main-layout";

export default async function OrganizationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <MainLayout breadcrumbs={[{ label: slug }]}>
      <div>Dashboard - {slug}</div>
    </MainLayout>
  );
}
