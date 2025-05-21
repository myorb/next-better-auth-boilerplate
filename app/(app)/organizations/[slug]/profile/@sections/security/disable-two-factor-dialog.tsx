"use client";

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
import { authClient } from "@/lib/auth-client";
import {
  DisableTwoFactorSchema,
  disableTwoFactorSchema
} from "@/types/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function DisableTwoFactorDialog() {
  const router = useRouter();
  const [isDisabling2FA, setIsDisabling2FA] = useState(false);
  const form = useForm<DisableTwoFactorSchema>({
    resolver: zodResolver(disableTwoFactorSchema),
    defaultValues: { password: "" },
    mode: "onChange",
  });

  const onSubmit = async (value: DisableTwoFactorSchema) => {
    try {
      setIsDisabling2FA(true);
      const { data, error } = await authClient.twoFactor.disable({
        password: value.password,
      });
      console.log(data, error);
      if (error) toast.error(error.message);
      if (data) {
        toast.success("2FA disabled successfully");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to disable 2FA");
    } finally {
      setIsDisabling2FA(false);
    }
  };

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
            <Button type="submit" className="w-full" loading={isDisabling2FA}>
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
