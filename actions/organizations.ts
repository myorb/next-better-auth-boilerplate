"use server";

import { appConfig } from "@/constants/config";
import {
  validatedAction,
  validatedActionWithUser,
} from "@/lib/action-validation";
import { auth } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/server-action-response";
import {
  acceptInvitationSchema,
  cancelInvitationSchema,
  CreateOrganization,
  declineInvitationSchema,
  inviteMemberSchema,
  resendInvitationSchema,
  updateMemberSchema,
  UpdateOrganization,
} from "@/types/organization.schema";
import { InvitationWithOrganization } from "@/types/organizations";
import { APIError } from "better-auth/api";
import { Organization } from "better-auth/plugins/organization";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function createOrganization(
  organization: CreateOrganization
): Promise<{
  success: boolean;
  error?: string | null;
  data?: Organization | null;
}> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return { success: false, error: "Unauthorized" };

    const { name, slug } = organization;

    const createdOrganization = await auth.api.createOrganization({
      body: { name, slug },
      headers: await headers(),
    });

    revalidatePath(appConfig.authRoutes.default);
    return {
      success: true,
      error: null,
      data: createdOrganization,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      return { success: false, error: error.body?.message };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function updateOrganization(
  organization: UpdateOrganization
): Promise<{
  success: boolean;
  error?: string | null;
  data?: Organization | null;
}> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return { success: false, error: "Unauthorized" };

    const { name, slug } = organization;

    const updatedOrganization = await auth.api.updateOrganization({
      body: { data: { name, slug } },
      headers: await headers(),
    });

    revalidatePath(appConfig.authRoutes.default);
    return {
      success: true,
      error: null,
      data: updatedOrganization,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      return { success: false, error: error.body?.message };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export async function setActiveOrganization(slug: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return { success: false, error: "Unauthorized" };

    const activeOrganization = await auth.api.setActiveOrganization({
      body: { organizationSlug: slug },
      headers: await headers(),
    });

    revalidatePath(appConfig.authRoutes.default);
    return { success: true, error: null, data: activeOrganization };
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      return { success: false, error: error.body?.message };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }
}

export const getInvitation = async (
  id: string
): Promise<{
  success: boolean;
  error?: string | null;
  data?: InvitationWithOrganization | null;
}> => {
  try {
    const invitation = (await auth.api.getInvitation({
      query: { id },
      headers: await headers(),
    })) as InvitationWithOrganization;

    return { success: true, error: null, data: invitation };
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      return { success: false, error: error.body?.message };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }
};

export const onInviteMember = validatedActionWithUser(
  inviteMemberSchema,
  async (data, user) => {
    try {
      const { email, role } = data;

      await auth.api.createInvitation({
        body: { email, role },
        headers: await headers(),
      });

      revalidatePath("/members");
      return successResponse("Invitation sent successfully");
    } catch (error) {
      console.error("Error inviting member:", error);
      if (error instanceof APIError) {
        return errorResponse(
          error.body?.message ?? "Failed to send invitation"
        );
      }
      return errorResponse("Failed to send invitation");
    }
  }
);

export const onUpdateMember = validatedActionWithUser(
  updateMemberSchema,
  async (data, user) => {
    try {
      await auth.api.updateMemberRole({
        body: { memberId: data.id, role: data.role },
        headers: await headers(),
      });

      revalidatePath("/members");
      return successResponse("Member updated successfully");
    } catch (error) {
      console.error("Error updating member:", error);
      if (error instanceof APIError) {
        return errorResponse(error.body?.message ?? "Failed to update member");
      }
      return errorResponse("Failed to update member");
    }
  }
);

export const onCancelInvitation = validatedActionWithUser(
  cancelInvitationSchema,
  async (data, user) => {
    try {
      await auth.api.cancelInvitation({
        body: { invitationId: data.invitationId },
        headers: await headers(),
      });

      revalidatePath("/members");
      return successResponse("Invitation canceled successfully");
    } catch (error) {
      console.error("Error canceling invitation:", error);
      if (error instanceof APIError) {
        return errorResponse(
          error.body?.message ?? "Failed to cancel invitation"
        );
      }
      return errorResponse("Failed to cancel invitation");
    }
  }
);

export const onResendInvitation = validatedActionWithUser(
  resendInvitationSchema,
  async (data, user) => {
    try {
      await auth.api.createInvitation({
        body: { email: data.email, role: data.role, resend: true },
        headers: await headers(),
      });

      revalidatePath("/members");
      return successResponse("Invitation resent successfully");
    } catch (error) {
      console.error("Error resending invitation:", error);
      if (error instanceof APIError) {
        return errorResponse(
          error.body?.message ?? "Failed to resend invitation"
        );
      }
      return errorResponse("Failed to resend invitation");
    }
  }
);

export const onAcceptInvitation = validatedAction(
  acceptInvitationSchema,
  async (data) => {
    try {
      await auth.api.acceptInvitation({
        body: { invitationId: data.invitationId },
        headers: await headers(),
      });

      // Redirect to dashboard
      // revalidatePath(data.revalidatePath ?? "/onboarding");
      revalidatePath(data.revalidatePath ?? appConfig.authRoutes.default);
      return successResponse("Invitation accepted successfully");
    } catch (error) {
      console.error("Error accepting invitation:", error);
      if (error instanceof APIError) {
        return errorResponse(
          error.body?.message ?? "Failed to accept invitation"
        );
      }
      return errorResponse("Failed to accept invitation");
    }
  }
);

export const onDeclineInvitation = validatedAction(
  declineInvitationSchema,
  async (data) => {
    try {
      await auth.api.rejectInvitation({
        body: { invitationId: data.invitationId },
        headers: await headers(),
      });

      revalidatePath(data.revalidatePath ?? appConfig.authRoutes.default);
      return successResponse("Invitation declined successfully");
    } catch (error) {
      console.error("Error declining invitation:", error);
      if (error instanceof APIError) {
        return errorResponse(
          error.body?.message ?? "Failed to decline invitation"
        );
      }
      return errorResponse("Failed to decline invitation");
    }
  }
);