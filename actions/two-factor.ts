"use server";

import { auth } from "@/lib/auth";
import { authActionClient } from "@/lib/safe-action";
import {
    disableTwoFactorSchema,
    enableTwoFactorSchema,
    verifyTwoFactorTOTPSchema
} from "@/types/account.schema";
import { headers } from "next/headers";

export const enableTwoFactorAction = authActionClient
  .inputSchema(enableTwoFactorSchema)
  .action(async ({ parsedInput }) => {
    const { password } = parsedInput;
    try {
      const { totpURI, backupCodes } = await auth.api.enableTwoFactor({
        body: { password },
        headers: await headers(),
      });
      return {
        success: true,
        message: "2FA enabled successfully",
        data: { totpURI, backupCodes },
      };
    } catch (error) {
      throw error;
    }
  });

export const disableTwoFactorAction = authActionClient
  .inputSchema(disableTwoFactorSchema)
  .action(async ({ parsedInput }) => {
    const { password } = parsedInput;
    try {
      await auth.api.disableTwoFactor({
        body: { password },
        headers: await headers(),
      });
      return { success: true, message: "2FA disabled successfully" };
    } catch (error) {
      throw error;
    }
  });

export const verifyTwoFactorTOTPAction = authActionClient
  .inputSchema(verifyTwoFactorTOTPSchema)
  .action(async ({ parsedInput }) => {
    const { code } = parsedInput;
    try {
      await auth.api.verifyTOTP({
        body: { code },
        headers: await headers(),
      });
      return { success: true, message: "2FA verified successfully" };
    } catch (error) {
      throw error;
    }
  });
