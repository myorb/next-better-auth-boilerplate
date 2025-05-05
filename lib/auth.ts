import MagicLinkEmail from "@/emails/magic-link-login";
import { db } from "@/server"; // your drizzle instance
import { render } from "@react-email/components";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  emailOTP,
  magicLink,
  organization,
  twoFactor,
} from "better-auth/plugins";
import { resend } from "./resend";

export const auth = betterAuth({
  appName: "Next Better Auth Neon Boilerplate",
  baseURL: process.env.BETTER_AUTH_URL!,
  database: drizzleAdapter(db, { provider: "pg", usePlural: true }),
  trustedOrigins: [process.env.BETTER_AUTH_URL!],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false, //defaults to true
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: process.env.BETTER_AUTH_EMAIL_FROM!,
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "email-password"],
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.BETTER_AUTH_EMAIL_FROM!,
        to: user.email,
        subject: "Verify your email address",
        text: `Click the link to verify your email: ${url}`,
      });
    },
  },
  plugins: [
    twoFactor({
      otpOptions: {
        async sendOTP({ user, otp }) {
          await resend.emails.send({
            from: process.env.BETTER_AUTH_EMAIL_FROM!,
            to: user.email,
            subject: "2FA OTP for Vaanix",
            text: `Your 2FA OTP is: ${otp}. It will expire in 5 minutes.`,
          });
        },
      },
    }),
    organization(),
    magicLink({
      sendMagicLink: async ({ email, url }) => {
        await resend.emails.send({
          from: process.env.BETTER_AUTH_EMAIL_FROM!,
          to: email,
          subject: "Magic Link for Vaanix",
          react: MagicLinkEmail({ magicLink: url }),
          text: await render(MagicLinkEmail({ magicLink: url }), {
            plainText: true,
          }),
        });
      },
    }),
    emailOTP({
      otpLength: 6,
      expiresIn: 300, // 5 minutes
      allowedAttempts: 1,
      disableSignUp: true, // If the user is not registered, they'll be automatically registered. If you want to prevent this, set to true
      sendVerificationOnSignUp: true,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          await resend.emails.send({
            from: process.env.BETTER_AUTH_EMAIL_FROM!,
            to: email,
            subject: "Sign in to Vaanix",
            text: `Your verification code is: ${otp}. It will expire in 5 minutes.`,
          });
        } else if (type === "forget-password") {
          await resend.emails.send({
            from: process.env.BETTER_AUTH_EMAIL_FROM!,
            to: email,
            subject: "Reset your password",
            text: `Your password reset code is: ${otp}. It will expire in 5 minutes.`,
          });
        }
      },
    }),
  ],
});
