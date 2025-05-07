"use client";

import { CreateOrganizationForm } from "@/components/create-organization-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconFlowerFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";

export default function CreateOrganizationPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 h-svh justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <IconFlowerFilled className="size-8 mb-4" />
          <CardTitle className="flex items-center justify-between">
            <span>Create Organization</span>
            <Link
              href="/organizations"
              className="text-muted-foreground text-sm hover:text-primary underline underline-offset-3"
            >
              View all
            </Link>
          </CardTitle>
          <CardDescription>
            Create a new organization to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateOrganizationForm
            onSuccess={() => {
              router.push("/organizations");
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
