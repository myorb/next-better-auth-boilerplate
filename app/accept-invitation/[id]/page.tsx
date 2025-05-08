import { getInvitation } from "@/actions/organizations";
import AcceptInvitationCard from "./accept-invitation-card";
import InvalidInvitationCard from "./invalid-invitation-card";

export default async function AcceptInvitation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const invitation = await getInvitation(id);

  if (!invitation.success || !invitation.data) return <InvalidInvitationCard />;

  return <AcceptInvitationCard invitation={invitation.data} />;
}
