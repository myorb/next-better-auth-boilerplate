import { z } from "zod";

export const roleSchema = z.enum(["member", "admin", "owner"]);

export const createOrganizationSchema = z.object({
  name: z.string(),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens",
    }),
});

export type CreateOrganization = z.infer<typeof createOrganizationSchema>;

export const updateOrganizationNameSchema = z.object({
  name: z.string(),
});

export type UpdateOrganizationName = z.infer<
  typeof updateOrganizationNameSchema
>;

export const updateOrganizationSlugSchema = z.object({
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens",
    }),
});

export const setActiveOrganizationSchema = z.object({
  id: z.string().min(1, { message: "Organization ID is required" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens",
    }),
});

export type SetActiveOrganization = z.infer<typeof setActiveOrganizationSchema>;

export const inviteMemberSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: roleSchema,
});

export type InviteMember = z.infer<typeof inviteMemberSchema>;

export const cancelInvitationSchema = z.object({
  invitationId: z.string().min(1, "Invitation ID is required"),
});

export type CancelInvitation = z.infer<typeof cancelInvitationSchema>;

export const resendInvitationSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: roleSchema,
});

export type ResendInvitation = z.infer<typeof resendInvitationSchema>;

export const acceptInvitationSchema = z.object({
  invitationId: z.string().min(1, "Invitation ID is required"),
  revalidatePath: z.string().optional(),
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
