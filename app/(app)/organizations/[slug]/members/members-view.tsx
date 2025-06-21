"use client";

import { OrganizationRelations } from "@/types/organizations";
import { InvitationsTable } from "./invitations-table";
import { InviteMemberDialog } from "./invite-member-dialog";
import { MembersTable } from "./members-table";

interface MembersViewProps {
  organization: OrganizationRelations;
}

export function MembersView({ organization }: MembersViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Members</h1>
          <p className="text-sm text-muted-foreground">
            Invite people and assign organization roles
          </p>
        </div>
        <InviteMemberDialog />
      </div>
      <div className="space-y-8">
        <MembersTable members={organization.members} />
      </div>
      <div className="flex flex-col justify-between gap-4">
        {organization.invitations && organization.invitations.length > 0 && (
          <InvitationsTable invitations={organization.invitations} />
        )}
      </div>
    </div>
  );
}
