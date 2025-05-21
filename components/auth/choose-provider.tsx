import { Button } from "@/components/ui/button";
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth-client";
import { IconKey, IconMail } from "@tabler/icons-react";
import { useRouter } from "nextjs-toploader/app";
import { GoogleSignInButton } from "./google";
import { useEffect } from "react";

export function ChooseProvider() {
  const router = useRouter();

  useEffect(() => {
    if (
      !PublicKeyCredential.isConditionalMediationAvailable ||
      !PublicKeyCredential.isConditionalMediationAvailable()
    ) {
      return;
    }

    void authClient.signIn.passkey({ autoFill: true });
  }, []);

  const handleSignInWithPasskey = async () => {
    try {
      await authClient.signIn.passkey();
      router.push(appConfig.authRoutes.onboarding);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant="secondary"
        className="w-full"
        icon={<IconMail />}
        onClick={() => router.push(appConfig.authRoutes.magicLink)}
      >
        Magic Link
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        icon={<IconMail />}
        onClick={() => router.push(appConfig.authRoutes.signinWithOtp)}
      >
        Sign in with OTP
      </Button>
      <GoogleSignInButton />
      <Button
        variant="secondary"
        className="w-full"
        icon={<IconKey />}
        onClick={handleSignInWithPasskey}
      >
        Passkey
      </Button>
    </div>
  );
}
