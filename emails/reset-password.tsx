import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

type ResetPasswordEmailProps = {
  url: string;
  expiresIn: string;
};

export const ResetPasswordEmail = ({
  url,
  expiresIn,
}: ResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Reset your password</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[20px] mx-auto my-0 max-w-[600px]">
            <Section className="mt-[32px]">
              <Heading className="text-[24px] font-bold text-[#333] text-center m-0 p-0">
                Password Reset Request
              </Heading>
            </Section>
            <Section className="mt-[24px]">
              <Text className="text-[16px] leading-[24px] text-[#333]">
                Hello,
              </Text>
              <Text className="text-[16px] leading-[24px] text-[#333]">
                We received a request to reset your password. If you didn&apos;t
                make this request, you can safely ignore this email.
              </Text>
              <Text className="text-[16px] leading-[24px] text-[#333]">
                To reset your password, please click the button below:
              </Text>
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#0366d6] rounded-[4px] text-white py-[12px] px-[20px] text-[16px] font-semibold no-underline text-center box-border"
                href={url}
              >
                Reset Password
              </Button>
            </Section>
            <Section>
              <Text className="text-[16px] leading-[24px] text-[#333]">
                If the button doesn&apos;t work, copy and paste the following
                link into your browser:
              </Text>
              <Text className="text-[14px] leading-[24px] text-[#0366d6] break-all">
                <Link href={url} className="text-[#0366d6] no-underline">
                  {url}
                </Link>
              </Text>
              <Text className="text-[16px] leading-[24px] text-[#333]">
                This password reset link will expire in {expiresIn} for security
                reasons.
              </Text>
            </Section>
            <Section className="mt-[32px]">
              <Text className="text-[16px] leading-[24px] text-[#333]">
                If you didn&apos;t request a password reset, please contact our
                support team immediately.
              </Text>
            </Section>
            <Hr className="border border-solid border-[#e6ebf1] my-[24px] mx-0 w-full" />
            <Section>
              <Text className="text-[14px] leading-[24px] text-[#666]">
                Regards,
              </Text>
            </Section>
          </Container>
          <Container className="max-w-[600px] mx-auto my-0">
            <Text className="text-[12px] leading-[24px] text-[#8898aa] text-center m-0">
              © {new Date().getFullYear()} Next Better Auth Boilerplate. All
              Rights Reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
