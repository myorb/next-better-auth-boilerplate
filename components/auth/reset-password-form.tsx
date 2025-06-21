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
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordUserSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type ResetPasswordUser = z.infer<typeof resetPasswordUserSchema>;

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  if (!token) {
    toast.error("Invalid token");
    router.push(appConfig.authRoutes.signin);
  }

  const form = useForm<ResetPasswordUser>({
    resolver: zodResolver(resetPasswordUserSchema),
    defaultValues: { password: "" },
    mode: "onChange",
  });

  const onSubmit = async (formData: ResetPasswordUser) => {
    try {
      const { error } = await authClient.resetPassword({
        newPassword: formData.password,
        token: token as string,
      });
      if (error) toast.error(error.message);
      else toast.success("Password reset successfully");
      router.push(appConfig.authRoutes.signin);
    } catch (error) {
      toast.error("Error resetting password");
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="********" />
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
            Reset password
          </Button>
        </div>
      </form>
    </Form>
  );
}
