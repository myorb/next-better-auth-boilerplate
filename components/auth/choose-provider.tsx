import { Button } from "@/components/ui/button";
import { appConfig } from "@/constants/config";
import { IconKey, IconMail } from "@tabler/icons-react";
import { useRouter } from "nextjs-toploader/app";
import { GoogleSignInButton } from "./google";

export function ChooseProvider() {
  const router = useRouter();
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
        onClick={() => router.push(appConfig.authRoutes.signin)}
      >
        Sign in with OTP
      </Button>
      <GoogleSignInButton />
      <Button
        variant="secondary"
        className="w-full"
        icon={<IconKey />}
        disabled
      >
        Passkey
      </Button>
    </div>
  );
}
