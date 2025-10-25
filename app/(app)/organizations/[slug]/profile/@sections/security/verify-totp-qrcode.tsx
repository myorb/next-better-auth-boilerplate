"use client";

import { verifyTwoFactorTOTPAction } from "@/actions/two-factor";
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
import { verifyTwoFactorTOTPSchema } from "@/types/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import QrCode from "react-qr-code";
import { toast } from "sonner";

type VerifyTOTPQRCodeProps = {
  secret: string;
};

export default function VerifyTOTPQRCode({ secret }: VerifyTOTPQRCodeProps) {
  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(
      verifyTwoFactorTOTPAction,
      zodResolver(verifyTwoFactorTOTPSchema),
      {
        formProps: {
          mode: "onChange",
          defaultValues: { code: "" },
        },
        actionProps: {
          onSuccess: () => {
            resetFormAndAction();
            toast.success("2FA verified successfully");
          },
          onError: (error) => {
            toast.error(error.error.serverError);
          },
        },
      }
    );

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
          <form onSubmit={handleSubmitWithAction} className="space-y-4">
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
            <Button
              type="submit"
              className="w-full"
              loading={action.isExecuting}
            >
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
