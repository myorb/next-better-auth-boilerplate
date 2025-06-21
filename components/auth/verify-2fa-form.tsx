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
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import router from "next/router";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const verify2FaUserSchema = z.object({
  otp: z.string().min(6, { message: "OTP must be 6 digits" }),
});

type Verify2FaUser = z.infer<typeof verify2FaUserSchema>;

export function Verify2FaForm() {
  const router = useRouter();
  const form = useForm<Verify2FaUser>({
    resolver: zodResolver(verify2FaUserSchema),
    defaultValues: { otp: "" },
    mode: "onChange",
  });

  const onSubmit = async (formData: Verify2FaUser) => {
    try {
      const { data, error } = await authClient.twoFactor.verifyTotp({
        code: formData.otp,
        trustDevice: true,
      });
      if (error) toast.error(error.message);
      if (data) {
        router.push(appConfig.authRoutes.onboarding);
        toast.success("Code verified successfully");
      }
    } catch (error) {
      toast.error("Error verifying code");
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
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
                  Please enter the one-time password from your authenticator
                  app.
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
            Verify 2FA Code
          </Button>
        </div>
      </form>
    </Form>
  );
}
