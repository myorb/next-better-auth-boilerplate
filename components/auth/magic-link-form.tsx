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
import { IconLock } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "nextjs-toploader/app";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { GoogleSignInButton } from "./google";

const magicLinkUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type MagicLinkUser = z.infer<typeof magicLinkUserSchema>;

export function MagicLinkForm() {
  const router = useRouter();
  const form = useForm<MagicLinkUser>({
    resolver: zodResolver(magicLinkUserSchema),
    defaultValues: { email: "" },
    mode: "onChange",
  });

  const onSubmit = async (formData: MagicLinkUser) => {
    try {
      const { error } = await authClient.signIn.magicLink({
        email: formData.email,
        callbackURL: "/",
      });
      if (error) toast.error(error.message);
      else toast.success("Magic link sent to email");
    } catch (error) {
      toast.error("Error signing in");
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
            Send Magic Link
          </Button>
        </div>
      </form>
    </Form>
  );
}
