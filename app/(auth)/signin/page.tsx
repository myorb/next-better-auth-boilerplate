import AuthWrapper from "@/components/auth/auth-wrapper";
import { Metadata } from "next";

const title = "Sign in | Next Better Auth Boilerplate";
const description = "Sign in to Next Better Auth Boilerplate";
const image = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=home`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://next-better-auth-boilerplate.vercel.app/signin",
  },
  keywords: ["Sign in", "Next Better Auth", "Sign in to Next Better Auth"],
  openGraph: {
    title,
    description,
    url: "https://next-better-auth-boilerplate.vercel.app/signin",
    siteName: "Next Better Auth Boilerplate",
    type: "website",
    locale: "en_US",
    images: [image],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [image],
    site: "Next Better Auth Boilerplate",
  },
};

export default async function SigninPage() {
  return (
    <AuthWrapper
      title="Sign in"
      description="Sign in to your account to continue."
      view="signin"
    />
  );
}
