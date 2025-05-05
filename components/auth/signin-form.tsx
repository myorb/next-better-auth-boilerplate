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
import Link from "next/link";
import router from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const signinSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

type SigninUser = z.infer<typeof signinSchema>;

export function SigninForm() {
  const form = useForm<SigninUser>({
    resolver: zodResolver(signinSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const onSubmit = async (formData: SigninUser) => {
    try {
      await authClient.signIn.email(
        {
          email: formData.email,
          password: formData.password,
          callbackURL: "/",
        },
        {
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
          onSuccess: () => {
            toast.success("Signed in successfully");
          },
        }
      );
    } catch (error) {
      toast.error("Error signing in");
    } finally {
      form.reset();
    }
  };

  return (
    <div className="space-y-4">
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
                    <Input
                      {...field}
                      type="email"
                      placeholder="m@example.com"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center justify-between">
                    Password
                    <Link
                      href="/forgot-password"
                      className="text-sm text-muted-foreground hover:underline hover:underline-offset-4"
                    >
                      Forgot password?
                    </Link>
                  </FormLabel>
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
              Login
            </Button>
          </div>
        </form>
      </Form>
      {/* <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
        <span className="relative z-10 bg-card px-2 text-muted-foreground">
          Or continue with
        </span>
      </div>
      <Button
        variant="secondary"
        className="w-full"
        icon={<IconMail />}
        onClick={() => router.push("/magic-link")}
      >
        Sign in with Magic Link
      </Button>
      <Button
        variant="secondary"
        className="w-full"
        icon={<IconMail />}
        onClick={() => router.push("/signin-otp")}
      >
        Sign in with OTP
      </Button>
      <GoogleSignInButton /> */}
      {/* <div className="text-xs text-center text-muted-foreground">
        <span className="mr-1">Don&apos;t have an account?</span>
        <Link
          href="/signup"
          className="text-primary underline underline-offset-4"
        >
          Sign Up
        </Link>
      </div> */}
    </div>
  );
}
