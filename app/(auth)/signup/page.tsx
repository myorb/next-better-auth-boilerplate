import AuthWrapper from "@/components/auth/auth-wrapper";
import { Metadata } from "next";

const title = "Login | Vaanix";
const description = "Login to Vaanix";
const image = `/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&type=home`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "https://vaanix.in/login" },
  keywords: ["Login", "Vaanix", "Login to Vaanix"],
  openGraph: {
    title,
    description,
    url: "https://vaanix.in/login",
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

export default async function SignupPage() {
  return (
    <AuthWrapper
      title="Create your account"
      description="Fill in the form below to create an account."
      view="signup"
    />
  );
}
