import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("sidebar_state")?.value === "true" || true;

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar slug={slug} />
      <SidebarInset className="overflow-y-hidden h-svh">
        <div className="flex flex-col gap-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
