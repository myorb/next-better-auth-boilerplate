"use server";

import { appConfig } from "@/constants/config";
import { validatedActionWithUser } from "@/lib/action-validation";
import { auth } from "@/lib/auth";
import { errorResponse, successResponse } from "@/lib/server-action-response";
import { linkAccountSchema, unlinkAccountSchema } from "@/types/account.schema";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const onLinkAccount = validatedActionWithUser(
  linkAccountSchema,
  async (data, user) => {
    try {
      await auth.api.linkSocialAccount({
        body: { provider: data.provider, callbackURL: data.callbackURL },
        headers: await headers(),
      });
      return successResponse("Account linked successfully");
    } catch (error) {
      console.error(error);
      if (error instanceof APIError) {
        return errorResponse(error.body?.message ?? "Failed to link account");
      }
      return errorResponse("Failed to link account");
    }
  }
);

export const onUnlinkAccount = validatedActionWithUser(
  unlinkAccountSchema,
  async (data, user) => {
    try {
      await auth.api.unlinkAccount({
        body: { providerId: data.providerId, accountId: data.accountId },
        headers: await headers(),
      });
      revalidatePath(
        `${appConfig.authRoutes.default}/[slug]/profile/providers`,
        "page"
      );
      return successResponse("Account unlinked successfully");
    } catch (error) {
      console.error(error);
      if (error instanceof APIError) {
        return errorResponse(error.body?.message ?? "Failed to unlink account");
      }
      return errorResponse("Failed to unlink account");
    }
  }
);
