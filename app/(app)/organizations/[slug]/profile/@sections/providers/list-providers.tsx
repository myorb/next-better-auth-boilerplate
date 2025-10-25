"use client";

import { unlinkAccountAction } from "@/actions/accounts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/constants/config";
import { authClient } from "@/lib/auth-client";
import {
  IconBrandApple,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useAction } from "next-safe-action/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const providers: {
  key: string;
  label: string;
  icon: React.ReactNode;
}[] = [
  {
    key: "github",
    label: "GitHub",
    icon: <IconBrandGithub className="size-6" />,
  },
  {
    key: "google",
    label: "Google",
    icon: <IconBrandGoogle className="size-6" />,
  },
  {
    key: "facebook",
    label: "Facebook",
    icon: <IconBrandFacebook className="size-6" />,
  },
  {
    key: "apple",
    label: "Apple",
    icon: <IconBrandApple className="size-6" />,
  },
];

interface ListProvidersProps {
  accounts: {
    id: string;
    providerId: string;
    createdAt: Date;
    updatedAt: Date;
    accountId: string;
    scopes: string[];
  }[];
}

export default function ListProviders({ accounts }: ListProvidersProps) {
  const { slug } = useParams<{ slug: string }>();
  const [selectedAccountKey, setSelectedAccountKey] = useState<string | null>(
    null
  );
  const [isLinkingAccount, setIsLinkingAccount] = useState(false);

  const handleLinkAccount = async (providerId: string) => {
    try {
      setIsLinkingAccount(true);
      const { error } = await authClient.signIn.social({
        provider: providerId,
        callbackURL: `${appConfig.authRoutes.default}/${slug}/profile/providers`,
      });
      if (error) toast.error(error.message);
      else toast.success("Account linked successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsLinkingAccount(false);
    }
  };
  const unlinkAccount = useAction(unlinkAccountAction);

  return (
    <Card className="bg-card text-card-foreground rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>Providers</CardTitle>
        <CardDescription>
          Connect your account with a third-party service.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {providers.map((provider) => {
          const linkedAccount = accounts.find(
            (account) => account.providerId === provider.key
          );

          return (
            <div
              key={provider.key}
              className="flex items-center justify-between rounded-xl border px-6 py-4 bg-background/50"
            >
              <div className="flex items-center gap-3">
                {provider.icon}
                <span className="font-medium text-sm">{provider.label}</span>
              </div>
              <Button
                variant={linkedAccount ? "outline" : "default"}
                size="sm"
                loading={
                  (unlinkAccount.isExecuting &&
                    selectedAccountKey === provider.key) ||
                  (isLinkingAccount && selectedAccountKey === provider.key)
                }
                onClick={() => {
                  setSelectedAccountKey(provider.key);
                  if (linkedAccount) {
                    unlinkAccount.execute({
                      providerId: linkedAccount.providerId,
                      accountId: linkedAccount.accountId,
                    });
                  } else {
                    handleLinkAccount(provider.key);
                  }
                }}
              >
                {linkedAccount ? "Unlink" : "Link"}
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
