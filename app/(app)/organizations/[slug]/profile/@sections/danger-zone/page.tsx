"use client";

import { deleteUserAction } from "@/actions/users";
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
import { appConfig } from "@/constants/config";
import { deleteUserSchema } from "@/types/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useRouter } from "nextjs-toploader/app";
import { toast } from "sonner";

export default function DangerZone() {
  const router = useRouter();

  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(deleteUserAction, zodResolver(deleteUserSchema), {
      formProps: {
        mode: "onChange",
        defaultValues: { password: "" },
      },
      actionProps: {
        onSuccess: () => {
          resetFormAndAction();
          toast.success("Account deleted successfully");
          router.push(appConfig.authRoutes.default);
        },
        onError: (error) => {
          toast.error(error.error.serverError);
        },
      },
    });

  return (
    <Form {...form}>
      <form onSubmit={handleSubmitWithAction}>
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
                    <Input {...field} placeholder="********" type="password" />
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
              loading={action.isExecuting}
            >
              Delete Account
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
