import { z } from "zod";
import { ProviderType } from "@/types/organizations";

export const linkAccountSchema = z.object({
  provider: z.string().transform((val) => val as ProviderType),
  callbackURL: z.string().url(),
});

export type LinkAccountSchema = z.infer<typeof linkAccountSchema>;

export const unlinkAccountSchema = z.object({
  providerId: z.string().transform((val) => val as ProviderType),
  accountId: z.string(),
});

export type UnlinkAccountSchema = z.infer<typeof unlinkAccountSchema>;
