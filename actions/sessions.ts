"use server";

import { appConfig } from "@/constants/config";
import { validatedActionWithUser } from "@/lib/action-validation";
import { auth } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/server-action-response";
import { revokeSessionSchema } from "@/types/session.schema";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";

export const onRevokeSession = validatedActionWithUser(
  revokeSessionSchema,
  async (data, user) => {
    try {
      await auth.api.revokeSession({
        body: { token: data.token },
        headers: await headers(),
      });

      revalidatePath(
        `${appConfig.authRoutes.default}/[slug]/profile/active-sessions`
      );
      return successResponse("Session revoked successfully");
    } catch (error) {
      console.error(error);
      if (error instanceof APIError) {
        return errorResponse(error.body?.message ?? "Failed to revoke session");
      }
      return errorResponse("Something went wrong. Please try again.");
    }
  }
);

export const onRevokeOtherSessions = validatedActionWithUser(
  z.object({}),
  async (data, user) => {
    try {
      await auth.api.revokeOtherSessions({
        headers: await headers(),
      });

      revalidatePath(
        `${appConfig.authRoutes.default}/[slug]/profile/active-sessions`
      );
      return successResponse("All sessions revoked successfully");
    } catch (error) {
      console.error(error);
      if (error instanceof APIError) {
        return errorResponse(
          error.body?.message ?? "Failed to revoke all sessions"
        );
      }
      return errorResponse("Something went wrong. Please try again.");
    }
  }
);
