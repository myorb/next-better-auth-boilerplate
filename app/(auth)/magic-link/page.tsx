import AuthWrapper from "@/components/auth/auth-wrapper";

export default async function MagicLinkPage() {
  return (
    <AuthWrapper
      title="Magic Link"
      description="Enter your email to receive a magic link."
      view="magic-link"
    />
  );
}
