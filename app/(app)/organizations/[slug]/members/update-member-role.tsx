"use client";

import { updateMemberAction } from "@/actions/organizations";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { updateMemberSchema } from "@/types/organization.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHookFormAction } from "@next-safe-action/adapter-react-hook-form/hooks";
import { useEffect } from "react";
import { toast } from "sonner";

type Member = typeof authClient.$Infer.Member;

type UpdateMemberRoleDialogProps = {
  member: Member | null;
  open: boolean;
  setOpen: (open: boolean) => void;
};

export function UpdateMemberRoleDialog({
  member,
  open,
  setOpen,
}: UpdateMemberRoleDialogProps) {
  // const { data: activeOrganization } = authClient.useActiveOrganization();

  const { form, action, handleSubmitWithAction, resetFormAndAction } =
    useHookFormAction(updateMemberAction, zodResolver(updateMemberSchema), {
      formProps: {
        mode: "onChange",
        defaultValues: {
          id: member?.id,
          role: member?.role ?? "member",
        },
      },
      actionProps: {
        onSuccess: () => {
          resetFormAndAction();
          setOpen(false);
          toast.success("Member role updated successfully");
        },
        onError: (error) => {
          toast.error(error.error.serverError ?? "Something went wrong");
        },
      },
    });

  useEffect(() => {
    if (member) {
      form.reset({
        id: member.id,
        role: member.role,
      });
    }
  }, [member, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Member Role</DialogTitle>
          <DialogDescription>
            Update the member&apos;s role in the organization
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={handleSubmitWithAction} className="space-y-4">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="owner">Owner</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="member">Member</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              loading={action.isExecuting}
            >
              Update Role
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
