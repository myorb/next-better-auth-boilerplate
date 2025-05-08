"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { Invitation } from "better-auth/plugins";
import { format } from "date-fns";
import { InvitationActions } from "./invitation-actions";

interface InvitationsTableProps {
  invitations: Invitation[];
}

export function InvitationsTable({ invitations }: InvitationsTableProps) {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="font-bold text-xl">Invitations</h1>
          <div className="text-sm text-muted-foreground">
            ({invitations.length})
          </div>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage your invitations and accept or decline them.
        </p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invitations
            .filter((invitation) => invitation.status === "pending")
            .map((invitation) => (
              <TableRow key={invitation.id}>
                <TableCell className="flex items-center gap-2">
                  <Avatar className="size-8 rounded-lg">
                    <AvatarImage src={invitation.email} />
                    <AvatarFallback className="rounded-lg">
                      {invitation.email.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <TextEllipsis className="text-sm" width={160}>
                    {invitation.email}
                  </TextEllipsis>
                </TableCell>
                <TableCell>
                  <Badge>
                    {invitation.role === "member" && "Member"}
                    {invitation.role === "owner" && "Owner"}
                    {invitation.role === "admin" && "Admin"}
                  </Badge>
                </TableCell>
                <TableCell>
                  {invitation.status === "pending" ? (
                    <Badge variant="outline">Pending</Badge>
                  ) : (
                    <Badge variant="outline">Accepted</Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {format(invitation.expiresAt, "MMM d, yyyy")}
                </TableCell>
                <TableCell>
                  <InvitationActions
                    invitationId={invitation.id}
                    email={invitation.email}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
