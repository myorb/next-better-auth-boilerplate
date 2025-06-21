"use client";

import { Button } from "@/components/ui/button";
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth-client";
import { IconBrandGithub } from "@tabler/icons-react";
import { useState } from "react";
import { toast } from "sonner";

export function GithubSignInButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social(
        {
          provider: "github",
          callbackURL: appConfig.authRoutes.onboarding,
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="secondary"
      className="w-full"
      loading={isLoading}
      icon={<IconBrandGithub />}
      onClick={handleSignIn}
    >
      Github
    </Button>
  );
}
