"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TextEllipsis } from "@/components/ui/text-ellipsis";
import { authClient } from "@/lib/auth-client";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { UpdateMemberRoleDialog } from "./update-member-role";

type Member = typeof authClient.$Infer.Member;

interface MembersTableProps {
  members: Member[];
}

export function MembersTable({ members }: MembersTableProps) {
  const [open, setOpen] = useState(false);
  const [member, setMember] = useState<Member | null>(null);

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="flex items-center gap-2">
                <Avatar className="size-8 rounded-lg">
                  <AvatarImage src={member.user.image ?? ""} />
                  <AvatarFallback className="rounded-lg">
                    {member.user.name?.charAt(0).toUpperCase() ||
                      member.user.email.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <TextEllipsis className="text-sm" width={160}>
                  {member.user.name || member.user.email}
                </TextEllipsis>
              </TableCell>
              <TableCell>{member.user.email}</TableCell>
              <TableCell>
                {member.role === "owner" && <Badge>Owner</Badge>}
                {member.role === "admin" && <Badge>Admin</Badge>}
                {member.role === "member" && <Badge>Member</Badge>}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onSelect={(e) => {
                        setMember(member);
                        setOpen(true);
                      }}
                    >
                      Update Member
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive"
                      onSelect={(e) => {
                        setMember(member);
                        setOpen(true);
                      }}
                    >
                      Remove Member
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UpdateMemberRoleDialog
        member={member}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
