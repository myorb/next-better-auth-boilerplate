"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "../ui/input";
import { EmailOtpType } from "./email-otp-form";

const verifyOtpUserSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 digits" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .optional(),
});

type VerifyOtpUser = z.infer<typeof verifyOtpUserSchema>;

export function VerifyOtpForm() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const type = searchParams.get("type") as EmailOtpType;

  const form = useForm<VerifyOtpUser>({
    resolver: zodResolver(verifyOtpUserSchema),
    defaultValues: { otp: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (formData: VerifyOtpUser) => {
    try {
      if (type === "sign-in") {
        await authClient.signIn.emailOtp(
          {
            otp: formData.otp,
            email: email ?? "",
          },
          {
            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
            onSuccess: (ctx) => {
              toast.success("Signed in successfully");
            },
          }
        );
      } else if (type === "email-verification") {
        await authClient.emailOtp.verifyEmail(
          {
            otp: formData.otp,
            email: email ?? "",
          },
          {
            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
            onSuccess: (ctx) => {
              toast.success("Email verified successfully");
            },
          }
        );
      } else if (type === "forget-password") {
        await authClient.emailOtp.resetPassword(
          {
            otp: formData.otp,
            email: email ?? "",
            password: formData.password ?? "",
          },
          {
            onError: (ctx) => {
              toast.error(ctx.error.message);
            },
            onSuccess: (ctx) => {
              toast.success("Password reset successfully");
            },
          }
        );
      }
    } catch (error) {
      toast.error("Error sending OTP");
    }
  };

  if (
    !email ||
    !type ||
    !["sign-in", "email-verification", "forget-password"].includes(type)
  ) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-sm text-muted-foreground">
          <p>
            Something went wrong. Please go to{" "}
            <Link href="/sign-in" className="text-blue-500">
              sign in
            </Link>
            .
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {type === "forget-password" && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>OTP</FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    {...field}
                    pattern={REGEXP_ONLY_DIGITS}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription className="text-sm text-muted-foreground">
                  Please enter the one-time password sent to your email.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            loading={form.formState.isSubmitting}
          >
            Verify OTP
          </Button>
        </div>
      </form>
    </Form>
  );
}
