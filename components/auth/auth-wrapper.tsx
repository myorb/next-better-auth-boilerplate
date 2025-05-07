"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/constants/config";
import { IconFlowerFilled } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { ChooseProvider } from "./choose-provider";
import { EmailOtpForm } from "./email-otp-form";
import { ForgotPasswordForm } from "./forgot-password-form";
import { MagicLinkForm } from "./magic-link-form";
import { ResetPasswordForm } from "./reset-password-form";
import { SigninForm } from "./signin-form";
import { SignupForm } from "./signup-form";
import { Verify2FaForm } from "./verify-2fa-form";
import { VerifyOtpForm } from "./verify-otp-form";

type AuthWrapperProps = {
  title: string;
  description: string;
  view:
    | "signin"
    | "signup"
    | "magic-link"
    | "forgot-password"
    | "reset-password"
    | "signin-otp"
    | "choose-provider"
    | "verify-otp"
    | "verify-2fa";
};

export default function AuthWrapper({
  title,
  description,
  view,
}: AuthWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();

  const renderView = () => {
    switch (view) {
      case "signin":
        return <SigninForm />;
      case "signup":
        return <SignupForm />;
      case "magic-link":
        return <MagicLinkForm />;
      case "forgot-password":
        return <ForgotPasswordForm />;
      case "reset-password":
        return <ResetPasswordForm />;
      case "signin-otp":
        return <EmailOtpForm type="sign-in" />;
      case "choose-provider":
        return <ChooseProvider />;
      case "verify-otp":
        return <VerifyOtpForm />;
      case "verify-2fa":
        return <Verify2FaForm />;
    }
  };

  const isChooseProvider = [
    "/choose-provider",
    "/verify-otp",
    "/verify-2fa",
  ].includes(pathname);

  const renderBottomNavigation = () => {
    switch (view) {
      case "choose-provider":
      case "forgot-password":
      case "reset-password":
      case "signin-otp":
      case "magic-link":
      case "verify-otp":
        return (
          <div className="text-xs text-center text-muted-foreground">
            <Link
              href={appConfig.authRoutes.signin}
              className="text-primary underline underline-offset-4"
            >
              Go back
            </Link>
          </div>
        );
      case "signin":
        return (
          <div className="text-xs text-center text-muted-foreground">
            <span className="mr-1">Don&apos;t have an account?</span>
            <Link
              href={appConfig.authRoutes.signup}
              className="text-primary underline underline-offset-4"
            >
              Sign Up
            </Link>
          </div>
        );
      case "signup":
        return (
          <div className="text-xs text-center text-muted-foreground">
            <span className="mr-1">Already have an account?</span>
            <Link
              href={appConfig.authRoutes.signin}
              className="text-primary underline underline-offset-4"
            >
              Sign in
            </Link>
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-sm pb-0 relative">
      <CardHeader className="shadow-xs border-none bg-transparent">
        <div className="flex flex-col items-center text-center gap-2">
          <IconFlowerFilled className="w-10 h-10" />
          <CardTitle className="text-xl font-semibold">{title}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {renderView()}
        {!isChooseProvider && (
          <>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
            <Button
              variant="secondary"
              className="w-full"
              onClick={() =>
                router.push(appConfig.authRoutes.chooseProvider)
              }
            >
              Choose provider
            </Button>
          </>
        )}
        {renderBottomNavigation()}
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
