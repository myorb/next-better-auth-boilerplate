"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export type EmailOtpType = "sign-in" | "email-verification" | "forget-password";

const emailOtpUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type EmailOtpUser = z.infer<typeof emailOtpUserSchema>;

export function EmailOtpForm({ type }: { type: EmailOtpType }) {
  const router = useRouter();
  const form = useForm<EmailOtpUser>({
    resolver: zodResolver(emailOtpUserSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const onSubmit = async (formData: EmailOtpUser) => {
    try {
      await authClient.emailOtp.sendVerificationOtp(
        { email: formData.email, type },
        {
          onError() {
            toast.error("Error sending OTP");
          },
          onSuccess() {
            router.push(`/verify-otp?email=${formData.email}&type=${type}`);
            toast.success("OTP sent to email");
          },
        }
      );
    } catch (error) {
      toast.error("Error sending OTP");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" placeholder="m@example.com" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            loading={form.formState.isSubmitting}
          >
            Send OTP
          </Button>
        </div>
      </form>
    </Form>
  );
}
