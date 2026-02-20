"use client";

import { CreateOrganizationForm } from "@/components/create-organization-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { appConfig } from "@/constants/config";
import { Plus } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";

export function CreateOrgModal() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="p-1 w-full justify-start cursor-pointer"
          onClick={() => setOpen(!open)}
        >
          <Plus className="size-4" />
          <span className="font-medium">Create Organization</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Organization</DialogTitle>
          <DialogDescription>
            Manage your organization and its content
          </DialogDescription>
        </DialogHeader>
        <div className="shadow-xs border-none">
          <div className="space-y-6 p-0">
            <CreateOrganizationForm
              onSuccess={({ slug }) => {
                setOpen(false);
                router.push(`${appConfig.authRoutes.default}/${slug}`);
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
