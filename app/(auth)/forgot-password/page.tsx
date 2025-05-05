import AuthWrapper from "@/components/auth/auth-wrapper";

export default function ForgotPasswordPage() {
  return (
    <AuthWrapper
      title="Forgot Password"
      description="Enter your email to reset your password."
      view="forgot-password"
    />
  );
}
