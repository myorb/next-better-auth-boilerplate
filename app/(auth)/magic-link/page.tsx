"use client";

import { MagicLinkForm } from "@/components/auth/magic-link-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconFlowerFilled } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MagicLinkPage() {
  const router = useRouter();

  return (
    <Card className="w-full max-w-xs sm:max-w-sm pb-0 relative">
      <CardHeader className="shadow-xs border-none bg-transparent">
        <div className="flex flex-col items-center text-center gap-2">
          <IconFlowerFilled
            className="size-10 cursor-pointer"
            onClick={() => router.push("/")}
          />
          <CardTitle className="text-xl font-semibold">Magic Link</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Enter your email to receive a magic link.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <MagicLinkForm />
      </CardContent>
      <CardFooter className="bg-muted rounded-b-lg p-4">
        <div className="flex flex-col gap-2">
          <div className="text-xs text-center text-muted-foreground">
            By signing up, you agree to our{" "}
            <Link href="/terms-of-use">Terms of Use</Link> and{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
