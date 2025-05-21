"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { DeleteUserForm, deleteUserSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function DangerZone() {
  const [isDeleting, setIsDeleting] = useState(false);
  const form = useForm<DeleteUserForm>({
    resolver: zodResolver(deleteUserSchema),
    defaultValues: { password: "" },
    mode: "onChange",
  });

  const onSubmit = async (value: DeleteUserForm) => {
    try {
      setIsDeleting(true);
      const { data, error } = await authClient.deleteUser({
        password: value.password,
      });
      if (error) throw new Error(error.message);
      else toast.success("Account deleted successfully");
      console.log(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              This action will delete your account and all of your data, this
              action is irreversible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please enter your password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="********" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <Separator />
          <CardFooter className="flex flex-row justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              This action will delete your account.
            </p>
            <Button
              type="submit"
              size="sm"
              variant="destructive"
              loading={isDeleting}
            >
              Delete Account
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
