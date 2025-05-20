import * as React from "react";
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
  Text,
  Tailwind,
} from "@react-email/components";

interface ChangeEmailVerificationEmailProps {
  url: string;
  newEmailAddress: string;
  expiresIn: string;
}

export const ChangeEmailVerificationEmail = ({
  url,
  newEmailAddress,
  expiresIn,
}: ChangeEmailVerificationEmailProps) => {
  const currentYear = new Date().getFullYear();

  return (
    <Html>
      <Head />
      <Preview>Confirm your new email address</Preview>
      <Tailwind>
        <Body className="bg-[#f6f9fc] font-sans py-[40px]">
          <Container className="bg-white rounded-[8px] p-[20px] max-w-[600px]">
            <Heading className="text-[24px] font-bold text-[#333] mt-0 mb-[16px]">
              Confirm your new email address
            </Heading>

            <Text className="text-[16px] leading-[24px] text-[#555] mb-[12px]">
              We received a request to change your email address to:
            </Text>

            <Text className="text-[18px] font-bold text-[#333] mb-[24px]">
              {newEmailAddress}
            </Text>

            <Text className="text-[16px] leading-[24px] text-[#555] mb-[24px]">
              To complete this process and verify this new email address, please
              click the button below.
            </Text>

            <Section className="text-center mb-[32px]">
              <Button
                className="bg-[#0070f3] text-white rounded-[4px] py-[12px] px-[20px] font-medium no-underline text-center box-border"
                href={url}
              >
                Confirm Email Change
              </Button>
            </Section>

            <Text className="text-[16px] leading-[24px] text-[#555] mb-[24px]">
              If you didn&apos;t request this change, please ignore this email
              or contact our support team immediately to secure your account.
            </Text>

            <Text className="text-[16px] leading-[24px] text-[#555] mb-[24px]">
              This link will expire in {expiresIn} for security reasons.
            </Text>

            <Hr className="border-solid border-[#e6ebf1] my-[24px]" />

            <Text className="text-[14px] leading-[24px] text-[#666]">
              If the button above doesn&apos;t work, copy and paste this URL
              into your browser:
            </Text>

            <Text className="text-[14px] leading-[24px] text-[#0070f3] mb-[32px]">
              <Link href={url} className="text-[#0070f3] no-underline">
                {url}
              </Link>
            </Text>

            <Hr className="border-solid border-[#e6ebf1] my-[24px]" />

            <Text className="text-[12px] leading-[20px] text-[#8898aa]">
              This is an automated email. Please do not reply to this message.
            </Text>

            <Text className="text-[12px] leading-[20px] text-[#8898aa] m-0">
              &copy; {currentYear} Next Auth Boilerplate. All rights reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
