"use client";

import {
  onCancelInvitation,
  onResendInvitation,
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
import { useServerAction } from "@/hooks/use-server-action";
import { RefreshCw } from "lucide-react";
import { z } from "zod";

interface InvitationActionsProps {
  invitationId: string;
  email: string;
}

export function InvitationActions({
  invitationId,
  email,
}: InvitationActionsProps) {
  const { execute: cancelAction, isLoading: cancelPending } = useServerAction({
    action: onCancelInvitation,
    message: { loading: "Cancelling invitation..." },
  });
  const { execute: resendAction, isLoading: resendPending } = useServerAction({
    action: onResendInvitation,
    message: { loading: "Resending invitation..." },
  });

  const handleResend = async (invitationId: string) => {
    await resendAction({ invitationId });
  };

  const handleCancel = async (invitationId: string) => {
    await cancelAction({ invitationId });
  };

  return (
    <div className="flex items-center gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-primary"
            disabled={resendPending || cancelPending}
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
            <AlertDialogCancel disabled={resendPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleResend(invitationId)}
              disabled={resendPending}
            >
              Resend Invitation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            disabled={cancelPending || resendPending}
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
            <AlertDialogCancel disabled={cancelPending}>
              No, keep it
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleCancel(invitationId)}
              disabled={cancelPending}
            >
              Yes, cancel invitation
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
