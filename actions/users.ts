"use server";

import { appConfig } from "@/constants/config";
import { validatedActionWithUser } from "@/lib/action-validation";
import { auth } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/server-action-response";
import {
  changePasswordSchema,
  setPasswordSchema,
  updateUserNameSchema,
} from "@/types/user.schema";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const onUpdateUserName = validatedActionWithUser(
  updateUserNameSchema,
  async (data, user) => {
    try {
      await auth.api.updateUser({
        body: { name: data.name },
        headers: await headers(),
      });

      revalidatePath(
        `${appConfig.authRoutes.default}/[slug]/profile/personal-details`
      );
      return successResponse("Profile details updated successfully");
    } catch (error) {
      console.error(error);
      if (error instanceof APIError) {
        return errorResponse(
          error.body?.message ?? "Failed to update profile details"
        );
      }
      return errorResponse("Something went wrong. Please try again.");
    }
  }
);

export const onSetPassword = validatedActionWithUser(
  setPasswordSchema,
  async (data, user) => {
    try {
      await auth.api.setPassword({
        body: { newPassword: data.password },
        headers: await headers(),
      });

      revalidatePath(`${appConfig.authRoutes.default}/[slug]/profile/security`);
      return successResponse("Password updated successfully");
    } catch (error) {
      console.error(error);
      if (error instanceof APIError) {
        return errorResponse(
          error.body?.message ?? "Failed to update password"
        );
      }
      return errorResponse("Something went wrong. Please try again.");
    }
  }
);

export const onChangePassword = validatedActionWithUser(
  changePasswordSchema,
  async (data, user) => {
    try {
      // Check if the current password is correct
      await auth.api.changePassword({
        body: {
          newPassword: data.newPassword,
          currentPassword: data.currentPassword,
          revokeOtherSessions: true,
        },
        headers: await headers(),
      });

      revalidatePath(`${appConfig.authRoutes.default}/[slug]/profile/security`);
      return successResponse("Password changed successfully");
    } catch (error) {
      console.error(error);
      if (error instanceof APIError) {
        return errorResponse(
          error.body?.message ?? "Failed to change password"
        );
      }
      return errorResponse("Something went wrong. Please try again.");
    }
  }
);
