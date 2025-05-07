import { TwoFactorOtpEmail } from "@/emails/2fa-otp-verification";
import { VerificationEmail } from "@/emails/email-verification";
import MagicLinkEmail from "@/emails/magic-link-login";
import { ResetPasswordEmail } from "@/emails/reset-password";
import { ResetPasswordOtpEmail } from "@/emails/reset-password-otp";
import { SigninOtpVerificationEmail } from "@/emails/signin-otp-verification";
import { db } from "@/server"; // your drizzle instance
import { render } from "@react-email/components";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import {
  emailOTP,
  magicLink,
  organization,
  twoFactor
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
    autoSignIn: false,
    sendOnSignUp: false,
    requireEmailVerification: false,
    sendResetPassword: async ({ user, url, token }, request) => {
      await resend.emails.send({
        from: process.env.BETTER_AUTH_EMAIL_FROM!,
        to: user.email,
        subject: "Reset your password",
        react: ResetPasswordEmail({ url, expiresIn: "24 hours" }),
        text: await render(ResetPasswordEmail({ url, expiresIn: "24 hours" }), {
          plainText: true,
        }),
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
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 600, // 10 minutes
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: process.env.BETTER_AUTH_EMAIL_FROM!,
        to: user.email,
        subject: "Verify your email address",
        react: VerificationEmail({
          verificationUrl: url,
          expiresIn: "10 minutes",
        }),
        text: await render(
          VerificationEmail({
            verificationUrl: url,
            expiresIn: "10 minutes",
          }),
          { plainText: true }
        ),
      });
    },
  },
  plugins: [
    twoFactor({
      otpOptions: {
        digits: 6,
        period: 300, // 5 minutes
        allowedAttempts: 3,
        async sendOTP({ user, otp }) {
          await resend.emails.send({
            from: process.env.BETTER_AUTH_EMAIL_FROM!,
            to: user.email,
            subject: "2FA OTP for Vaanix",
            react: TwoFactorOtpEmail({
              otpCode: otp,
              expiresIn: "5 minutes",
            }),
            text: await render(
              TwoFactorOtpEmail({
                otpCode: otp,
                expiresIn: "5 minutes",
              }),
              { plainText: true }
            ),
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
      sendVerificationOnSignUp: false,
      async sendVerificationOTP({ email, otp, type }) {
        if (type === "sign-in") {
          await resend.emails.send({
            from: process.env.BETTER_AUTH_EMAIL_FROM!,
            to: email,
            subject: "Sign in to Vaanix",
            react: SigninOtpVerificationEmail({
              verificationCode: otp,
              expiresIn: "5 minutes",
            }),
            text: await render(
              SigninOtpVerificationEmail({
                verificationCode: otp,
                expiresIn: "5 minutes",
              }),
              { plainText: true }
            ),
          });
        } else if (type === "forget-password") {
          await resend.emails.send({
            from: process.env.BETTER_AUTH_EMAIL_FROM!,
            to: email,
            subject: "Reset your password",
            react: ResetPasswordOtpEmail({
              otp: otp,
              expiresIn: "5 minutes",
            }),
            text: await render(
              ResetPasswordOtpEmail({
                otp: otp,
                expiresIn: "5 minutes",
              }),
              { plainText: true }
            ),
          });
        }
      },
    }),
  ],
});