"use client";

import {
  cancelInvitationAction,
  resendInvitationAction,
} from "@/actions/organizations";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { OrganizationMemberRole } from "@/types/organizations";
import { RefreshCw } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

interface InvitationActionsProps {
  invitationId: string;
  email: string;
  role: OrganizationMemberRole;
}

export function InvitationActions({
  invitationId,
  email,
  role,
}: InvitationActionsProps) {
  const [open, setOpen] = useState(false);
  const cancelAction = useAction(cancelInvitationAction, {
    onSuccess: () => {
      toast.success("Invitation canceled successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.error.serverError ?? "Something went wrong");
    },
  });
  const resendAction = useAction(resendInvitationAction, {
    onSuccess: () => {
      toast.success("Invitation resent successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(error.error.serverError ?? "Something went wrong");
    },
  });

  return (
    <div className="flex items-center gap-2">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
            disabled={resendAction.isExecuting || cancelAction.isExecuting}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Resend Invitation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send a new invitation email to {email}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={resendAction.isExecuting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => resendAction.executeAsync({ email, role })}
              disabled={resendAction.isExecuting}
            >
              Resend Invitation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            disabled={cancelAction.isExecuting || resendAction.isExecuting}
          >
            Cancel
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Invitation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently cancel the invitation sent to {email}. They
              won&apos;t be able to join using this invitation.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={cancelAction.isExecuting}>
              No, keep it
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => cancelAction.executeAsync({ invitationId })}
              disabled={cancelAction.isExecuting}
            >
              Yes, cancel invitation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
