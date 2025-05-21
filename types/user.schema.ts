import { z } from "zod";

export const updateUserNameSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

export type UpdateUserName = z.infer<typeof updateUserNameSchema>;

export const setPasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export type SetPasswordForm = z.infer<typeof setPasswordSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Current password must be at least 8 characters long",
    }),
    newPassword: z
      .string()
      .min(8, { message: "New password must be at least 8 characters long" }),
  })
  .superRefine(({ newPassword, currentPassword }, ctx) => {
    if (newPassword === currentPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password cannot be the same as the current password",
      });
    }
  });
export type ChangePasswordForm = z.infer<typeof changePasswordSchema>;
