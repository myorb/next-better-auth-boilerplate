import { appConfig } from "@/constants/config";
import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AcceptInvitationCard from "./accept-invitation-card";
import InvalidInvitationCard from "./invalid-invitation-card";

export default async function AcceptInvitation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const invitation = await auth.api.getInvitation({
      query: { id },
      headers: await headers(),
    });
    return <AcceptInvitationCard invitation={invitation} />;
  } catch (error) {
    if (error instanceof APIError && error.statusCode === 401) {
      return redirect(appConfig.authRoutes.signin);
    }
    return <InvalidInvitationCard />;
  }
}
