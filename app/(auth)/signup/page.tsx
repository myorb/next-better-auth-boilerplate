import AuthWrapper from "@/components/auth/auth-wrapper";
import { Metadata } from "next";

const title = "Sign up | Next Better Auth Boilerplate";
const description = "Sign up to Next Better Auth Boilerplate";
const image = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=home`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "https://next-better-auth-boilerplate.vercel.app/signup",
  },
  keywords: ["Sign up", "Next Better Auth", "Sign up to Next Better Auth"],
  openGraph: {
    title,
    description,
    url: "https://next-better-auth-boilerplate.vercel.app/signup",
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

export default async function SignupPage() {
  return (
    <AuthWrapper
      title="Create your account"
      description="Fill in the form below to create an account."
      view="signup"
    />
  );
}
