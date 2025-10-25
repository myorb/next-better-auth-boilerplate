"use client";

import { setPasswordAction } from "@/actions/users";
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
import { setPasswordSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";

export default function SetPassword() {
  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(setPasswordAction, zodResolver(setPasswordSchema), {
      formProps: {
        mode: "onChange",
        defaultValues: { password: "" },
      },
      actionProps: {
        onSuccess: () => {
          resetFormAndAction();
          toast.success("Password updated successfully");
        },
        onError: (error) => {
          toast.error(error.error.serverError);
        },
      },
    });

  return (
    <div className="flex flex-col gap-4 h-full">
      <Form {...form}>
        <form onSubmit={handleSubmitWithAction} className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Set Password</CardTitle>
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
                loading={action.isExecuting}
                disabled={action.isExecuting}
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
