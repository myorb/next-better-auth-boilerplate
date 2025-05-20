"use client";

import { onUpdateUserName } from "@/actions/users";
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
import { authClient } from "@/lib/auth-client";
import { UpdateUserName, updateUserNameSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Label } from "recharts";
import { toast } from "sonner";

export default function ProfileDetails() {
  const { data } = authClient.useSession();

  const { execute, isLoading } = useServerAction({
    action: onUpdateUserName,
    onSuccess: async () => {
      toast.success("Profile details updated successfully");
      await authClient.updateUser({ name: nameForm.getValues("name") });
    },
    onError: () => {
      toast.error("Failed to update profile details");
    },
  });

  const nameForm = useForm<UpdateUserName>({
    resolver: zodResolver(updateUserNameSchema),
    defaultValues: { name: data?.user.name },
    mode: "onChange",
  });

  useEffect(() => {
    nameForm.reset({ name: data?.user.name });
  }, [data, nameForm]);

  const onSubmitNameForm = async (data: UpdateUserName) => {
    await execute(data);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <Form {...nameForm}>
        <form
          onSubmit={nameForm.handleSubmit(onSubmitNameForm)}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Name</CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={nameForm.control}
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
                loading={isLoading}
                disabled={isLoading}
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
