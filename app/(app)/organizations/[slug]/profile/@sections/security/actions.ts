"use server";

import { appConfig } from "@/constants/config";
import { validatedActionWithUser } from "@/lib/action-validation";
import { auth } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/server-action-response";
import { enableTwoFactorSchema } from "@/types/account.schema";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const onEnable2FA = validatedActionWithUser(
  enableTwoFactorSchema,
  async (data, user) => {
    try {
      const { totpURI, backupCodes } = await auth.api.enableTwoFactor({
        body: { password: data.password },
        headers: await headers(),
      });

      revalidatePath(`${appConfig.authRoutes.default}/[slug]/profile/security`);
      return successResponse("2FA enabled successfully", {
        totpURI,
        backupCodes,
      });
    } catch (error) {
      console.error(error);
      if (error instanceof APIError) {
        return errorResponse(error.body?.message ?? "Failed to enable 2FA");
      }
      return errorResponse("Something went wrong. Please try again.");
    }
  }
);
