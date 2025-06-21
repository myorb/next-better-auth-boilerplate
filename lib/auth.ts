import MagicLinkEmail from "@/emails/magic-link-login";
import { db } from "@/server"; // your drizzle instance
import { render } from "@react-email/components";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import {
  magicLink
} from "better-auth/plugins";
import { resend } from "./resend";

export const auth = betterAuth({
  appName: "Next Better Auth Neon Boilerplate",
  baseURL: process.env.BETTER_AUTH_URL!,
  database: drizzleAdapter(db, { provider: "pg", usePlural: true }),
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  user: {
    deleteUser: { enabled: true },
  },
  plugins: [
    nextCookies(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: process.env.BETTER_AUTH_EMAIL_FROM!,
          to: email,
          subject: "Magic Link for Next Better Auth Boilerplate",
          react: MagicLinkEmail({ magicLink: url }),
          text: await render(MagicLinkEmail({ magicLink: url }), {
            plainText: true,
          }),
        });
      },
    }),
  ],
});