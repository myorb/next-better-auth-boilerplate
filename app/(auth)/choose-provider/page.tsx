import AuthWrapper from "@/components/auth/auth-wrapper";

export default function ChooseProviderPage() {
  return (
    <AuthWrapper
      title="Choose your provider"
      description="Choose your provider to sign in."
      view="choose-provider"
    />
  );
}
