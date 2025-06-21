"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import {
  VerifyTwoFactorSchema,
  verifyTwoFactorSchema,
} from "@/types/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import QrCode from "react-qr-code";
import { toast } from "sonner";

type VerifyTOTPQRCodeProps = {
  secret: string;
};

export default function VerifyTOTPQRCode({ secret }: VerifyTOTPQRCodeProps) {
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const form = useForm<VerifyTwoFactorSchema>({
    resolver: zodResolver(verifyTwoFactorSchema),
    defaultValues: { code: "" },
    mode: "onChange",
  });

  const onSubmit = async (value: VerifyTwoFactorSchema) => {
    try {
      setIsEnabling2FA(true);
      const { data, error } = await authClient.twoFactor.verifyTotp({
        code: value.code,
      });
      if (error) toast.error(error.message);
      console.log(data);
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
        <DialogTitle>Verify two-factor authentication</DialogTitle>
      </DialogHeader>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-sm">
          Scan this QR code with your authenticator app Use apps like Google
          Authenticator, Authy, or 1Password to scan the code and link your
          account.
        </div>
        <QrCode value={secret} />
        <Separator />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="123456" />
                  </FormControl>
                  <FormDescription>
                    Enter the 6-digit code from your authenticator app.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" loading={isEnabling2FA}>
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
