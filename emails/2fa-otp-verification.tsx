import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

type TwoFactorOtpEmailProps = {
  otpCode: string;
  expiresIn: string;
};

export const TwoFactorOtpEmail = ({
  otpCode,
  expiresIn,
}: TwoFactorOtpEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your verification code for secure login</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-[24px] font-bold text-gray-800 mt-[20px] mb-[16px]">
              Verification Code
            </Heading>
            <Text className="text-[16px] leading-[24px] text-gray-600 mb-[12px]">
              To complete your sign-in, please enter the following verification
              code:
            </Text>

            <Section className="text-center my-[32px]">
              <Container className="bg-gray-50 py-[16px] px-[24px] rounded-[8px] inline-block border border-gray-200">
                <Text className="text-[32px] font-bold tracking-[4px] text-gray-800 m-0">
                  {otpCode}
                </Text>
              </Container>
            </Section>

            <Text className="text-[16px] leading-[24px] text-gray-600 mb-[12px]">
              This code will expire in <strong>{expiresIn}</strong>. If you
              didn&apos;t request this code, you can safely ignore this email.
            </Text>

            <Text className="text-[16px] leading-[24px] text-gray-600 mb-[24px]">
              For security reasons, never share this code with anyone.
            </Text>

            <Hr className="border-gray-200 my-[24px]" />

            <Text className="text-[14px] text-gray-500 mb-[12px]">
              If you&apos;re having trouble with the verification code, you can
              contact our support team for assistance.
            </Text>

            <Text className="text-[12px] text-gray-400 m-0">
              © {new Date().getFullYear()} Next Better Auth Neon Boilerplate.
              All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
