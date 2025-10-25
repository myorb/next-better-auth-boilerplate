"use client";

import { changePasswordAction } from "@/actions/users";
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
import { changePasswordSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";

export default function ChangePassword() {
  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(changePasswordAction, zodResolver(changePasswordSchema), {
      formProps: {
        mode: "onChange",
        defaultValues: { currentPassword: "", newPassword: "" },
      },
      actionProps: {
        onSuccess: () => {
          resetFormAndAction();
          toast.success("Password changed successfully");
        },
        onError: (error) => {
          toast.error(error.error.serverError);
        },
      },
    });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Change password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <Separator />
          <CardFooter className="flex flex-row justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Use a different password from your current one. Strong passwords
              have a mix of letters, numbers, and special characters.
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
  );
}
