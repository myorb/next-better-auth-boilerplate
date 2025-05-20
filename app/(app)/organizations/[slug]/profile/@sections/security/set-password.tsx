"use client";

import { onSetPassword } from "@/actions/users";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useServerAction } from "@/hooks/use-server-action";
import { SetPasswordForm, setPasswordSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SetPassword() {
  const { execute, isLoading } = useServerAction({
    action: onSetPassword,
    onSuccess: () => toast.success("Password updated successfully"),
    onError: () => toast.error("Failed to update password"),
  });

  const form = useForm<SetPasswordForm>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: { password: "" },
    mode: "onChange",
  });

  const onSubmit = async (data: SetPasswordForm) => {
    await execute(data);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please enter your password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        {...field}
                        placeholder="********"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <Separator />
            <CardFooter className="flex flex-row justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                You don&apos;t have a password set. Please set a password to
                continue.
              </p>
              <Button
                type="submit"
                size="sm"
                loading={isLoading}
                disabled={isLoading}
              >
                Save
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
}
