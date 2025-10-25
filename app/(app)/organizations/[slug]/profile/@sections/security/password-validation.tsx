"use client";

import { enableTwoFactorAction } from "@/actions/two-factor";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
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
import { enableTwoFactorSchema } from "@/types/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { toast } from "sonner";

type PasswordValidationProps = {
  onEnable2FA: (data: { totpURI: string; backupCodes: string[] }) => void;
};

export default function PasswordValidation({ onEnable2FA }: PasswordValidationProps) {
  // const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  // const form = useForm<EnableTwoFactorSchema>({
  //   resolver: zodResolver(enableTwoFactorSchema),
  //   defaultValues: { password: "" },
  //   mode: "onChange",
  // });

  // const onSubmit = async (value: EnableTwoFactorSchema) => {
  //   try {
  //     setIsEnabling2FA(true);
  //     const { data, error } = await authClient.twoFactor.enable({
  //       password: value.password,
  //     });
  //     console.log(data, error);
  //     if (error) toast.error(error.message);
  //     if (data) onSuccess(data);
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Failed to enable 2FA");
  //   } finally {
  //     setIsEnabling2FA(false);
  //   }
  // };

  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(
      enableTwoFactorAction,
      zodResolver(enableTwoFactorSchema),
      {
        formProps: {
          mode: "onChange",
          defaultValues: { password: "" },
        },
        actionProps: {
          onSuccess: (args) => {
            resetFormAndAction();
            toast.success("2FA enabled successfully");
            onEnable2FA(args.data?.data);
          },
          onError: (error) => {
            toast.error(error.error.serverError);
          },
        },
      }
    );
  return (
    <>
      <DialogHeader>
        <DialogTitle>Enable two-factor authentication</DialogTitle>
      </DialogHeader>
      <DialogDescription>
        Two-factor authentication adds an extra layer of security to your
        account by requiring a code from an authenticator app in addition to
        your password.
      </DialogDescription>
      <Form {...form}>
        <form onSubmit={handleSubmitWithAction} className="space-y-4">
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
          <Button type="submit" className="w-full" loading={action.isExecuting}>
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
}
