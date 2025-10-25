"use client";

import { disableTwoFactorAction } from "@/actions/two-factor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  disableTwoFactorSchema
} from "@/types/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";

export default function DisableTwoFactorDialog() {
  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(
      disableTwoFactorAction,
      zodResolver(disableTwoFactorSchema),
      {
        formProps: {
          mode: "onChange",
          defaultValues: { password: "" },
        },
        actionProps: {
          onSuccess: () => {
            resetFormAndAction();
            toast.success("2FA disabled successfully");
          },
          onError: (error) => {
            toast.error(error.error.serverError);
          },
        },
      }
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Disable 2FA</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Disable two-factor authentication</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Two-factor authentication adds an extra layer of security to your
          account by requiring a code from an authenticator app in addition to
          your password.
        </DialogDescription>
        <Form {...form}>
          <form onSubmit={handleSubmitWithAction} className="space-y-4">
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
            <Button
              type="submit"
              className="w-full"
              loading={action.isExecuting}
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
