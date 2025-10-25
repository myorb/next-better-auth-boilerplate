"use server";

import { appConfig } from "@/constants/config";
import { auth } from "@/lib/auth";
import { authActionClient } from "@/lib/safe-action";
import { unlinkAccountSchema } from "@/types/account.schema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export const unlinkAccountAction = authActionClient
  .inputSchema(unlinkAccountSchema)
  .action(async ({ parsedInput }) => {
    const { providerId, accountId } = parsedInput;
    try {
      await auth.api.unlinkAccount({
        body: { providerId, accountId },
        headers: await headers(),
      });
    } catch (error) {
      throw error;
    }
    revalidatePath(
      `${appConfig.authRoutes.default}/[slug]/profile/providers`,
      "page"
    );
  });
