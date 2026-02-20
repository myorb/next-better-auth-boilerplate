"use server";

import { appConfig } from "@/constants/config";
import { auth } from "@/lib/auth";
import { authActionClient } from "@/lib/safe-action";
import { db } from "@/lib/prisma";
import {
  acceptInvitationSchema,
  cancelInvitationSchema,
  createOrganizationSchema,
  declineInvitationSchema,
  inviteMemberSchema,
  resendInvitationSchema,
  setActiveOrganizationSchema,
  updateMemberSchema,
  updateOrganizationNameSchema,
  updateOrganizationSlugSchema,
} from "@/types/organization.schema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const createOrganizationAction = authActionClient
  .inputSchema(createOrganizationSchema)
  .action(async ({ parsedInput }) => {
    const { name, slug } = parsedInput;
    try {
      const createdOrganization = await auth.api.createOrganization({
        body: { name, slug },
        headers: await headers(),
      });

      revalidatePath(appConfig.authRoutes.default);
      return {
        success: true,
        message: "Organization created successfully",
        data: createdOrganization,
      };
    } catch (error) {
      throw error;
    }
  });

export const updateOrganizationNameAction = authActionClient
  .inputSchema(updateOrganizationNameSchema)
  .action(async ({ parsedInput }) => {
    const { name } = parsedInput;
    try {
      const updatedOrganization = await auth.api.updateOrganization({
        body: { data: { name } },
        headers: await headers(),
      });

      revalidatePath(appConfig.authRoutes.default);
      return {
        success: true,
        message: "Organization name updated successfully",
        data: updatedOrganization,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

export const updateOrganizationSlugAction = authActionClient
  .inputSchema(updateOrganizationSlugSchema)
  .action(async ({ parsedInput }) => {
    const { slug } = parsedInput;
    try {
      await auth.api.updateOrganization({
        body: { data: { slug } },
        headers: await headers(),
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
    redirect(
      `${appConfig.authRoutes.default}/${slug}/settings`,
      RedirectType.replace
    );
  });

export const setActiveOrganizationAction = authActionClient
  .inputSchema(setActiveOrganizationSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { slug, id } = parsedInput;
    try {
      const activeOrganization = await auth.api.setActiveOrganization({
        body: { organizationSlug: slug, organizationId: id },
        headers: await headers(),
      });

      // update session table with active organization id
      await db.session.update({
        where: { id: ctx.sessionId },
        data: { activeOrganizationId: id },
      });

      revalidatePath(appConfig.authRoutes.default, "page");
      return {
        success: true,
        message: "Organization set as active successfully",
        data: activeOrganization,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

export const inviteMemberAction = authActionClient
  .inputSchema(inviteMemberSchema)
  .action(async ({ parsedInput }) => {
    const { email, role } = parsedInput;
    try {
      await auth.api.createInvitation({
        body: { email, role },
        headers: await headers(),
      });

      revalidatePath("/members");
      return { success: true, message: "Invitation sent successfully" };
    } catch (error) {
      console.error("Error inviting member:", error);
      throw error;
    }
  });

export const updateMemberAction = authActionClient
  .inputSchema(updateMemberSchema)
  .action(async ({ parsedInput }) => {
    const { id, role } = parsedInput;
    try {
      await auth.api.updateMemberRole({
        body: { memberId: id, role },
        headers: await headers(),
      });
    } catch (error) {
      console.error("Error updating member:", error);
      throw error;
    }
    revalidatePath("/members");
  });

export const cancelInvitationAction = authActionClient
  .inputSchema(cancelInvitationSchema)
  .action(async ({ parsedInput }) => {
    const { invitationId } = parsedInput;
    try {
      await auth.api.cancelInvitation({
        body: { invitationId },
        headers: await headers(),
      });
      revalidatePath(`${appConfig.authRoutes.default}/[slug]/members`, "page");
      return { success: true, message: "Invitation canceled successfully" };
    } catch (error) {
      console.error("Error canceling invitation:", error);
      throw error;
    }
  });

export const resendInvitationAction = authActionClient
  .inputSchema(resendInvitationSchema)
  .action(async ({ parsedInput }) => {
    const { email, role } = parsedInput;
    try {
      await auth.api.createInvitation({
        body: { email, role, resend: true },
        headers: await headers(),
      });
      revalidatePath(`${appConfig.authRoutes.default}/[slug]/members`, "page");
      return { success: true, message: "Invitation resent successfully" };
    } catch (error) {
      console.error("Error resending invitation:", error);
      throw error;
    }
  });

export const acceptInvitationAction = authActionClient
  .inputSchema(acceptInvitationSchema)
  .action(async ({ parsedInput }) => {
    const { invitationId, revalidatePath: revalidatePathValue } = parsedInput;
    try {
      await auth.api.acceptInvitation({
        body: { invitationId },
        headers: await headers(),
      });

      revalidatePath(revalidatePathValue || appConfig.authRoutes.default);
      return { success: true, message: "Invitation accepted successfully" };
    } catch (error) {
      console.error("Error accepting invitation:", error);
      throw error;
    }
  });

export const declineInvitationAction = authActionClient
  .inputSchema(declineInvitationSchema)
  .action(async ({ parsedInput }) => {
    const { invitationId, revalidatePath: revalidatePathValue } = parsedInput;
    try {
      await auth.api.rejectInvitation({
        body: { invitationId },
        headers: await headers(),
      });
      revalidatePath(revalidatePathValue || appConfig.authRoutes.default);
      return { success: true, message: "Invitation declined successfully" };
    } catch (error) {
      console.error("Error declining invitation:", error);
      throw error;
    }
  });

export async function getUserDefaultOrganizationId(
  userId: string
): Promise<string | null> {
  const organizationsData = await db.member.findFirst({
    where: { userId },
    select: { organizationId: true },
  });
  console.log(organizationsData);
  return organizationsData?.organizationId ?? null;
}