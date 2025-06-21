import AuthWrapper from "@/components/auth/auth-wrapper";

export default function VerifyOtpPage() {
  return (
    <AuthWrapper
      title="Verify OTP"
      description="Verify your OTP to continue"
      view="verify-otp"
    />
  );
}
