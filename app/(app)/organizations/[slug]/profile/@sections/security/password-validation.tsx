"use client";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
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
import {
  EnableTwoFactorSchema,
  enableTwoFactorSchema,
} from "@/types/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type PasswordValidationProps = {
  onSuccess: (
    data: {
      totpURI: string;
      backupCodes: string[];
    } | null
  ) => void;
};

export default function PasswordValidation({
  onSuccess,
}: PasswordValidationProps) {
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const form = useForm<EnableTwoFactorSchema>({
    resolver: zodResolver(enableTwoFactorSchema),
    defaultValues: { password: "" },
    mode: "onChange",
  });

  const onSubmit = async (value: EnableTwoFactorSchema) => {
    try {
      setIsEnabling2FA(true);
      const { data, error } = await authClient.twoFactor.enable({
        password: value.password,
      });
      console.log(data, error);
      if (error) toast.error(error.message);
      if (data) onSuccess(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to enable 2FA");
    } finally {
      setIsEnabling2FA(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Enable two-factor authentication</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Two-factor authentication adds an extra layer of security to your
        account by requiring a code from an authenticator app in addition to
        your password.
      </DialogDescription>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} placeholder="********" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full" loading={isEnabling2FA}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
