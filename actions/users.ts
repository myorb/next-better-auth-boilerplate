"use server";

import { auth } from "@/lib/auth";
import { authActionClient } from "@/lib/safe-action";
import {
  changePasswordSchema,
  deleteUserSchema,
  setPasswordSchema,
  updateUserNameSchema,
} from "@/types/user.schema";
import { headers } from "next/headers";

export const updateUserNameAction = authActionClient
  .inputSchema(updateUserNameSchema)
  .action(async ({ parsedInput }) => {
    const { name } = parsedInput;
    try {
      await auth.api.updateUser({
        body: { name },
        headers: await headers(),
      });
      return { success: true, message: "Profile details updated successfully" };
    } catch (error) {
      throw error;
    }
  });

export const setPasswordAction = authActionClient
  .inputSchema(setPasswordSchema)
  .action(async ({ parsedInput }) => {
    const { password } = parsedInput;
    try {
      await auth.api.setPassword({
        body: { newPassword: password },
        headers: await headers(),
      });
      return { success: true, message: "Password updated successfully" };
    } catch (error) {
      throw error;
    }
  });

export const changePasswordAction = authActionClient
  .inputSchema(changePasswordSchema)
  .action(async ({ parsedInput }) => {
    const { newPassword, currentPassword } = parsedInput;
    try {
      await auth.api.changePassword({
        body: { newPassword, currentPassword, revokeOtherSessions: true },
        headers: await headers(),
      });
      return { success: true, message: "Password changed successfully" };
    } catch (error) {
      throw error;
    }
  });

export const deleteUserAction = authActionClient
  .inputSchema(deleteUserSchema)
  .action(async ({ parsedInput }) => {
    const { password } = parsedInput;
    try {
      await auth.api.deleteUser({
        body: { password },
        headers: await headers(),
      });
      return { success: true, message: "Account deleted successfully" };
    } catch (error) {
      console.error(error);
      throw error;
    }
  });