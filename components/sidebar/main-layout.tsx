import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import React from "react";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { ScrollArea } from "@/components/ui/scroll-area";
// Types
type BreadcrumbItem = {
  label: string;
  href?: string;
};

type TopNavProps = {
  children: React.ReactNode;
  className?: string;
  breadcrumbs?: BreadcrumbItem[];
};

// Nested Components
function TopNavHeader({ breadcrumbs }: { breadcrumbs?: BreadcrumbItem[] }) {
  return (
    <header className="sticky top-0 mr-2 z-10 flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 px-4 bg-background">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="h-4!" />
      <Breadcrumb>
        <BreadcrumbList className="flex flex-wrap items-center gap-2">
          {breadcrumbs?.map((item, index) => (
            <React.Fragment key={item.label}>
              {index > 0 && <BreadcrumbSeparator className="block" />}
              <BreadcrumbItem className="block">
                {item.href ? (
                  <BreadcrumbLink href={item.href}>
                    <TextEllipsis width={120}>{item.label}</TextEllipsis>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>
                    <TextEllipsis width={120}>{item.label}</TextEllipsis>
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

function MainArea({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 p-4 pt-0 @container">{children}</div>
  );
}

// Main Component
export function MainLayout({ children, className, breadcrumbs }: TopNavProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      <ScrollArea className="h-[calc(100svh-5px)]">
        <TopNavHeader breadcrumbs={breadcrumbs} />
        <MainArea>{children}</MainArea>
      </ScrollArea>
    </div>
  );
}
