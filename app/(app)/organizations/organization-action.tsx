"use client";

import { Button } from "@/components/ui/button";
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth-client";
import { ArrowLeftIcon, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";

export function OrganizationAction() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <Link href={`${appConfig.authRoutes.default}/create`}>
        <Button>
          <Plus size={16} />
          Create Organization
        </Button>
      </Link>
      <Button
        variant="outline"
        onClick={() => {
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                router.push(appConfig.authRoutes.signin);
              },
            },
          });
        }}
      >
        <ArrowLeftIcon className="size-4" />
        Sign out
      </Button>
    </div>
  );
}
