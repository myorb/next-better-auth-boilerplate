import AuthWrapper from "@/components/auth/auth-wrapper";
import { Metadata } from "next";

const title = "Sign in | Vaanix";
const description = "Sign in to Vaanix";
const image = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=home`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://vaanix.in/signin" },
  keywords: ["Sign in", "Vaanix", "Sign in to Vaanix"],
  openGraph: {
    title,
    description,
    url: "https://vaanix.in/signin",
    siteName: "Vaanix",
    type: "website",
    locale: "en_US",
    images: [image],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: [image],
    site: "Vaanix",
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
