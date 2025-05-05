import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

type VerificationEmailProps = {
  verificationUrl: string;
  expiresIn: string;
};

export const VerificationEmail = ({
  verificationUrl,
  expiresIn,
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verify your email address</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto p-[20px] max-w-[600px]">
            <Section className="mt-[32px]">
              <Heading className="text-[24px] font-bold text-[#333] text-center">
                Verify Your Email Address
              </Heading>

              <Text className="text-[16px] leading-[24px] text-[#555]">
                Hello,
              </Text>

              <Text className="text-[16px] leading-[24px] text-[#555]">
                Thank you for signing up! To complete your registration and
                access all features, please verify your email address by
                clicking the button below:
              </Text>

              <Section className="text-center my-[32px]">
                <Button
                  className="bg-[#0070f3] text-white rounded-[8px] py-[12px] px-[20px] font-medium no-underline text-center box-border"
                  href={verificationUrl}
                >
                  Verify Email Address
                </Button>
              </Section>

              <Text className="text-[16px] leading-[24px] text-[#555]">
                If the button above doesn&apos;t work, you can also verify by
                copying and pasting the following link into your browser:
              </Text>

              <Text className="text-[14px] leading-[24px] text-[#0070f3] break-all">
                <Link
                  href={verificationUrl}
                  className="text-[#0070f3] no-underline"
                >
                  {verificationUrl}
                </Link>
              </Text>

              <Text className="text-[16px] leading-[24px] text-[#555]">
                This verification link will expire in {expiresIn} for security
                reasons.
              </Text>

              <Text className="text-[16px] leading-[24px] text-[#555]">
                If you did not create an account, please ignore this email or
                contact our support team if you have any concerns.
              </Text>

              <Text className="text-[16px] leading-[24px] text-[#555]">
                Best regards,
              </Text>
            </Section>

            <Section className="border-t border-solid border-[#e6ebf1] mt-[32px] pt-[32px] text-[12px] text-[#8898aa]">
              <Text className="m-0">
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
