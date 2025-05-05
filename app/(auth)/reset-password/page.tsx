import AuthWrapper from "@/components/auth/auth-wrapper";

export default function ResetPasswordPage() {
  return (
    <AuthWrapper
      title="Reset Password"
      description="Enter your new password to reset your account."
      view="reset-password"
    />
  );
}
