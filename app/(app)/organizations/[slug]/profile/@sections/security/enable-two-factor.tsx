"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { AlertCircle, Loader2 } from "lucide-react";
import DisableTwoFactorDialog from "./disable-two-factor-dialog";
import EnableTwoFactorDialog from "./enable-two-factor-dialog";

type EnableTwoFactorProps = {
  isCredentialProvider: boolean;
};

export default function EnableTwoFactor({
  isCredentialProvider,
}: EnableTwoFactorProps) {
  const { data, isPending } = authClient.useSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Two-factor authentication</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Two-factor authentication adds an extra layer of security to your
          account by requiring a code from an authenticator app in addition to
          your password.
        </p>
        {!isCredentialProvider ? (
          <p className="flex items-center gap-2 text-md font-medium text-orange-500/60">
            <AlertCircle className="size-4" />
            Set a password to enable two-factor authentication.
          </p>
        ) : isPending ? (
          <Loader2 className="size-4 animate-spin" />
        ) : data?.user?.twoFactorEnabled ? (
          <DisableTwoFactorDialog />
        ) : (
          <EnableTwoFactorDialog />
        )}
      </CardContent>
    </Card>
  );
}
