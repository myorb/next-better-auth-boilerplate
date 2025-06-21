"use client";

import { CreateOrganizationForm } from "@/components/create-organization-form";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/constants/config";
import { IconFlowerFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";

export default function CreateOrganizationPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 h-svh justify-center items-center">
      <Card className="w-full max-w-xs sm:max-w-sm">
        <CardHeader className="flex flex-col gap-2 items-center">
          <IconFlowerFilled className="size-8" />
          <CardTitle className="flex items-center justify-between">
            <span>Create Organization</span>
          </CardTitle>
          <CardDescription>
            Create a new organization to get started
          </CardDescription>
          <Link
            href={appConfig.authRoutes.default}
            className="text-muted-foreground text-sm hover:text-primary underline underline-offset-3"
          >
            View all
          </Link>
        </CardHeader>
        <CardContent>
          <CreateOrganizationForm
            onSuccess={() => {
              router.push(appConfig.authRoutes.default);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
