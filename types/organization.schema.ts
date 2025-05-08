import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export type CreateOrganization = z.infer<typeof createOrganizationSchema>;

export const updateOrganizationSchema = createOrganizationSchema.partial();

export type UpdateOrganization = z.infer<typeof updateOrganizationSchema>;

export const getInvitationSchema = z.object({
  id: z.string().min(1, "Invitation ID is required"),
});

export type GetInvitation = z.infer<typeof getInvitationSchema>;

export const inviteMemberSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["member", "admin", "owner"]),
});

export type InviteMember = z.infer<typeof inviteMemberSchema>;

export const cancelInvitationSchema = z.object({
  invitationId: z.string().min(1, "Invitation ID is required"),
});

export type CancelInvitation = z.infer<typeof cancelInvitationSchema>;

export const resendInvitationSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["member", "admin", "owner"]),
});

export type ResendInvitation = z.infer<typeof resendInvitationSchema>;

export const acceptInvitationSchema = z.object({
  invitationId: z.string().min(1, "Invitation ID is required"),
  revalidatePath: z.string().min(1, "Revalidate path is required"),
});

export type AcceptInvitation = z.infer<typeof acceptInvitationSchema>;

export const updateMemberSchema = z.object({
  id: z.string().min(1, "Member ID is required"),
  role: z.enum(["member", "admin", "owner"]),
});

export type UpdateMember = z.infer<typeof updateMemberSchema>;

export const declineInvitationSchema = z.object({
  invitationId: z.string().min(1, "Invitation ID is required"),
  revalidatePath: z.string().min(1, "Revalidate path is required"),
});

export type DeclineInvitation = z.infer<typeof declineInvitationSchema>;
