import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

interface MagicLinkEmailProps {
  magicLink: string;
}

export default function MagicLinkEmail({ magicLink }: MagicLinkEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your secure login link</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] mx-auto p-[20px] max-w-[600px]">
            <Section className="mt-[32px]">
              <Heading className="text-[24px] font-bold text-gray-800 text-center">
                Login to Your Account
              </Heading>

              <Text className="text-[16px] text-gray-600 mb-[24px]">
                Hello there,
              </Text>

              <Text className="text-[16px] text-gray-600 mb-[24px]">
                We received a request to log in to your account. Click the
                secure button below to access your account instantly - no
                password needed!
              </Text>

              <Section className="text-center mb-[32px]">
                <Button
                  className="font-bold py-[12px] px-[24px] rounded-[4px] no-underline text-center box-border"
                  href={magicLink}
                >
                  Secure Login
                </Button>
              </Section>

              <Text className="text-[14px] text-gray-600 mb-[24px]">
                This link will expire in 5 minutes and can only be used once.
              </Text>

              <Text className="text-[14px] text-gray-600 mb-[24px]">
                If you didn&apos;t request this login link, you can safely
                ignore this email.
              </Text>

              <Text className="text-[14px] text-gray-600">
                For security reasons, please never share this link with anyone.
              </Text>
            </Section>

            <Section className="border-t border-gray-200 mt-[32px] pt-[32px] text-center">
              <Text className="text-[12px] text-gray-500 m-0">
                © {new Date().getFullYear()} Next Better Auth Neon Boilerplate.
                All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
