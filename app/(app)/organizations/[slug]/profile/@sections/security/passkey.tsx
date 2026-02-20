"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { Passkey } from "@better-auth/passkey";
import { useState } from "react";

export default function PasskeyList({ passkeys }: { passkeys: Passkey[] }) {
  console.log(passkeys);
  const [isAddingPasskey, setIsAddingPasskey] = useState(false);

  const handleAddPasskey = async () => {
    try {
      setIsAddingPasskey(true);
      await authClient.passkey.addPasskey({
        name: "Passkey",
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsAddingPasskey(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Passkey</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Passkeys are a secure and easy way to access your account.
        </p>
        <Button onClick={handleAddPasskey} loading={isAddingPasskey}>
          Add passkey
        </Button>
        <div className="flex flex-col gap-2">
          {passkeys.map((passkey) => (
            <div key={passkey.id}>{passkey.name}</div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
