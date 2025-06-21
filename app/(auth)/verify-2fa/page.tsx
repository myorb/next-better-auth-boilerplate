import AuthWrapper from "@/components/auth/auth-wrapper";

export default function Verify2FaPage() {
  return (
    <AuthWrapper
      title="Verify 2FA Code"
      description="Enter the 2FA code to continue"
      view="verify-2fa"
    />
  );
}
