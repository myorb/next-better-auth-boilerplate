import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Suspense } from "react";

export default function MainSectionArea({
  sections,
}: {
  sections: React.ReactNode;
}) {
  return (
    <main className="flex flex-1 flex-col overflow-hidden gap-4 px-0 md:px-4">
      <ScrollArea className="flex flex-1 flex-col gap-4 h-[calc(100vh-10rem)]">
        <Suspense
          fallback={
            <div className="flex flex-col gap-4">
              <Skeleton className="h-40" />
              <Skeleton className="h-40" />
            </div>
          }
        >
          {sections}
        </Suspense>
      </ScrollArea>
    </main>
  );
}
