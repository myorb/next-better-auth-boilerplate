"use client";

import { updateUserNameAction } from "@/actions/users";
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
import { authClient } from "@/lib/auth-client";
import { updateUserNameSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { Label } from "recharts";
import { toast } from "sonner";

export default function ProfileDetails() {
  const { data } = authClient.useSession();

  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(updateUserNameAction, zodResolver(updateUserNameSchema), {
      formProps: {
        mode: "onChange",
        defaultValues: { name: data?.user.name },
      },
      actionProps: {
        onSuccess: async () => {
          resetFormAndAction();
          toast.success("Profile details updated successfully");
          await authClient.updateUser({ name: form.getValues("name") });
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
              <CardTitle>Name</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Please enter your full name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <Separator />
            <CardFooter className="flex flex-row justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                This action will update the name of the user.
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
      <Card>
        <CardHeader>
          <CardTitle>Email</CardTitle>
        </CardHeader>
        <CardContent>
          <Label>Please enter your email</Label>
          <Input
            disabled
            name="email"
            value={data?.user.email}
            placeholder="john.doe@example.com"
          />
        </CardContent>
        <Separator />
        <CardFooter className="flex flex-row justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            You can&apos;t change your email address.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
