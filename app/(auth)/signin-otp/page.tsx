import AuthWrapper from "@/components/auth/auth-wrapper";

export default function SigninOtpPage() {
  return (
    <AuthWrapper
      title="Sign in with OTP"
      description="Enter the OTP sent to your email to sign in."
      view="signin-otp"
    />
  );
}
