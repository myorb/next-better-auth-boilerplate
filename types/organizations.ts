import { authClient } from "@/lib/auth-client";
import { Organization } from "better-auth/plugins";

export type MemberInfer = typeof authClient.$Infer.Member;

export type InvitationInfer = typeof authClient.$Infer.Invitation;

export type OrganizationRelations = Organization & {
  members: MemberInfer[];
  invitations: InvitationInfer[];
};

export type InvitationWithOrganization = InvitationInfer & {
  organizationName: string;
  organizationSlug: string;
};

export type ProviderType = "github" | "google" | "facebook" | "apple";