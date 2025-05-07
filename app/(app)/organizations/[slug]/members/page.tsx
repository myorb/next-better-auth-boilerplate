import { MainLayout } from "@/components/sidebar/main-layout";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <MainLayout
      breadcrumbs={[
        { label: "Members", href: `/organizations/${slug}/members` },
      ]}
    >
      Members - {slug}
    </MainLayout>
  );
}
