"use client";

import { onUpdateMember } from "@/actions/organizations";
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
import { useServerAction } from "@/hooks/use-server-action";
import { authClient } from "@/lib/auth-client";
import { UpdateMember, updateMemberSchema } from "@/types/organization.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

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
  const { execute, isLoading } = useServerAction({
    action: onUpdateMember,
    message: {
      success: "Member updated successfully",
      loading: "Updating member...",
    },
  });
  const form = useForm<UpdateMember>({
    resolver: zodResolver(updateMemberSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: UpdateMember) => {
    const response = await execute(data);
    if (response.success) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (member) {
      form.reset({
        id: member.id,
        role: member.role ?? "member",
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" className="w-full" loading={isLoading}>
              Update Role
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
