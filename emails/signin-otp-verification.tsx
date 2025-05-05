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

type SigninOtpVerificationEmailProps = {
  verificationCode: string;
  expiresIn: string;
};

export const SigninOtpVerificationEmail = ({
  verificationCode,
  expiresIn,
}: SigninOtpVerificationEmailProps) => {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Preview>Your verification code is: {verificationCode}</Preview>
        <Body className="bg-[#f6f9fc] font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Heading className="text-[24px] font-bold text-[#333] text-center m-0 p-0">
                Verify Your Email Address
              </Heading>
            </Section>
            <Section className="mt-[24px]">
              <Text className="text-[16px] leading-[24px] text-[#333]">
                Hello,
              </Text>
              <Text className="text-[16px] leading-[24px] text-[#333]">
                Thank you for signing up! To complete your registration, please
                use the verification code below to confirm your email address.
              </Text>
            </Section>
            <Section className="my-[32px] text-center">
              <Container className="bg-[#f4f4f4] py-[16px] px-[24px] rounded-[8px] inline-block mx-auto">
                <Text className="text-[32px] font-bold tracking-[5px] text-center m-0 text-[#333]">
                  {verificationCode}
                </Text>
              </Container>
            </Section>
            <Section>
              <Text className="text-[16px] leading-[24px] text-[#333]">
                This code will expire in {expiresIn} for security reasons. If
                you didn&apos;t request this verification, please ignore this
                email.
              </Text>
            </Section>
            <Section className="mt-[32px]">
              <Text className="text-[14px] leading-[24px] text-[#666]">
                If you have any questions, please contact our support team.
              </Text>
            </Section>
            <Section className="border-t border-solid border-[#e6ebf1] mt-[32px] pt-[32px]">
              <Text className="text-[12px] leading-[20px] text-[#8898aa] m-0">
                © {new Date().getFullYear()} Next Better Auth Boilerplate. All
                rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
