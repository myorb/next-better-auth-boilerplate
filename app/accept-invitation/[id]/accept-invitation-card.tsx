"use client";

import {
  onAcceptInvitation,
  onDeclineInvitation,
} from "@/actions/organizations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/constants/config";
import { useServerAction } from "@/hooks/use-server-action";
import { InvitationWithOrganization } from "@/types/organizations";
import { IconFlowerFilled } from "@tabler/icons-react";
import { useRouter } from "nextjs-toploader/app";

export default function AcceptInvitationCard({
  invitation,
}: {
  readonly invitation: InvitationWithOrganization | null;
}) {
  const router = useRouter();
  const { execute: acceptInvitation, isLoading: isAcceptingInvitation } =
    useServerAction({
      action: onAcceptInvitation,
      onSuccess: () => {
        router.push(appConfig.authRoutes.default);
      },
    });

  const { execute: declineInvitation, isLoading: isDecliningInvitation } =
    useServerAction({
      action: onDeclineInvitation,
      onSuccess: () => {
        router.push(appConfig.authRoutes.default);
      },
    });

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Card className="w-full max-w-xs sm:max-w-sm relative">
        <CardHeader className="shadow-xs border-none bg-transparent">
          <div className="flex flex-col items-center text-center">
            <IconFlowerFilled className="size-10" />
            <div className="flex flex-col">
              <CardTitle className="text-xl font-semibold">
                Join {invitation?.organizationName}
              </CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                You&apos;ve been invited to collaborate
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 justify-center items-center">
          <div className="flex flex-col gap-2">
            <p className="text-center text-sm">
              Gain access to shared projects, resources, and team collaboration
              within <strong>{invitation?.organizationName}</strong>
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() =>
                declineInvitation({
                  invitationId: invitation?.id ?? "",
                  revalidatePath: appConfig.appRoutes.acceptInvitation,
                })
              }
              loading={isDecliningInvitation}
            >
              Decline Invitation
            </Button>
            <Button
              onClick={() =>
                acceptInvitation({
                  invitationId: invitation?.id ?? "",
                  revalidatePath: appConfig.appRoutes.acceptInvitation,
                })
              }
              loading={isAcceptingInvitation}
            >
              Join Team
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
