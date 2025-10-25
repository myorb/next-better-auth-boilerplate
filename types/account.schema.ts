import { z } from "zod";

export const linkAccountSchema = z.object({
  providerId: z.string(),
  callbackURL: z.string().url(),
});

export type LinkAccountSchema = z.infer<typeof linkAccountSchema>;

export const unlinkAccountSchema = z.object({
  providerId: z.string(),
  accountId: z.string(),
});

export type UnlinkAccountSchema = z.infer<typeof unlinkAccountSchema>;

export const enableTwoFactorSchema = z.object({
  password: z.string().min(8),
});

export type EnableTwoFactorSchema = z.infer<typeof enableTwoFactorSchema>;

export const disableTwoFactorSchema = z.object({
  password: z.string().min(8),
});

export type DisableTwoFactorSchema = z.infer<typeof disableTwoFactorSchema>;

export const verifyTwoFactorSchema = z.object({
  code: z.string().min(6),
});

export type VerifyTwoFactorSchema = z.infer<typeof verifyTwoFactorSchema>;

export const verifyTwoFactorTOTPSchema = z.object({
  code: z.string().min(6),
});

export type VerifyTwoFactorTOTPSchema = z.infer<
  typeof verifyTwoFactorTOTPSchema
>;
