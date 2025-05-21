import { MainLayout } from "@/components/sidebar/main-layout";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { AreaChatInteractive } from "./components/area-chat-interactive";
import { BarChartMultiple } from "./components/bar-chart-multiple";
import { LineChartMultiple } from "./components/line-chart-multiple";
import {
  PieChartDonut
} from "./components/pie-chart-donut";

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
        <p className="text-2xl font-semibold">
          Welcome back, {session.user.name}!
        </p>
        <p className="text-sm text-muted-foreground">
          You are currently in the <code className="font-semibold">{slug}</code>{" "}
          organization.
        </p>
      </div>
      <AreaChatInteractive />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LineChartMultiple />
        <BarChartMultiple />
        <PieChartDonut />
      </div>
    </MainLayout>
  );
}
