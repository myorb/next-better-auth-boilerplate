import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Preview,
    Section,
    Tailwind,
    Text
} from "@react-email/components";

type ResetPasswordOtpEmailProps = {
  otp: string;
  expiresIn: string;
};

export const ResetPasswordOtpEmail = ({
  otp,
  expiresIn,
}: ResetPasswordOtpEmailProps) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Your password reset code is: {otp}</Preview>
        <Body className="bg-[#f6f9fc] font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[20px] mx-auto my-0 max-w-[600px]">
            <Section className="mt-[32px]">
              <Heading className="text-[24px] font-bold text-[#333] my-[16px] mx-0">
                Reset Your Password
              </Heading>
              <Text className="text-[16px] leading-[24px] text-[#555] m-0">
                We received a request to reset your password. Please use the
                verification code below to complete the process:
              </Text>

              <Section className="bg-[#f4f7fa] rounded-[8px] my-[24px] mx-0 p-[20px] text-center">
                <Text className="font-bold text-[32px] tracking-[5px] text-[#333] m-0">
                  {otp}
                </Text>
              </Section>

              <Text className="text-[16px] leading-[24px] text-[#555] m-0">
                This code will expire in {expiresIn}. If you didn&apos;t request
                a password reset, please ignore this email or contact support if
                you have concerns.
              </Text>

              <Text className="text-[16px] leading-[24px] text-[#555] mt-[24px] mb-0 mx-0">
                For security reasons, we recommend creating a strong password
                that:
              </Text>
              <ul className="pl-[20px] mt-[8px] mb-[16px]">
                <li className="text-[16px] leading-[24px] text-[#555] m-0">
                  Is at least 8 characters long
                </li>
                <li className="text-[16px] leading-[24px] text-[#555] m-0">
                  Contains uppercase and lowercase letters
                </li>
                <li className="text-[16px] leading-[24px] text-[#555] m-0">
                  Includes numbers and special characters
                </li>
              </ul>

              <Text className="text-[16px] leading-[24px] text-[#555] mt-[24px] mb-0 mx-0">
                Need help? Contact our support team.
              </Text>
            </Section>

            <Section className="border-t border-solid border-[#e6ebf1] mt-[32px] pt-[32px] text-[14px] text-[#8898aa]">
              <Text className="m-0">
                © {new Date().getFullYear()} Next Better Auth Neon Boilerplate.
                All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
