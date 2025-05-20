"use client";

import { onUnlinkAccount } from "@/actions/accounts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { appConfig } from "@/constants/config";
import { useServerAction } from "@/hooks/use-server-action";
import { authClient } from "@/lib/auth-client";
import { ProviderType } from "@/types/organizations";
import {
  IconBrandApple,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandGoogle,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const providers: {
  key: ProviderType;
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
    provider: string;
    createdAt: Date;
    updatedAt: Date;
    accountId: string;
    scopes: string[];
  }[];
}

export default function ListProviders({ accounts }: ListProvidersProps) {
  const { slug } = useParams<{ slug: string }>();

  const [isAccountLinking, setIsAccountLinking] = useState<boolean>(false);
  const [selectedAccountKey, setSelectedAccountKey] = useState<string | null>(
    null
  );

  const handleLinkProvider = async (provider: ProviderType) => {
    try {
      setIsAccountLinking(true);
      const { error } = await authClient.linkSocial({
        provider,
        callbackURL: `${appConfig.authRoutes.default}/${slug}/profile/providers`,
      });
      if (error) throw new Error(error.message);
      toast.success("Provider linked successfully");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Failed to link provider");
    } finally {
      setIsAccountLinking(false);
    }
  };

  const { execute: executeUnlink, isLoading: isUnlinking } = useServerAction({
    action: onUnlinkAccount,
  });

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
            (account) => account.provider === provider.key
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
                  (isUnlinking && selectedAccountKey === provider.key) ||
                  (isAccountLinking && selectedAccountKey === provider.key)
                }
                onClick={() => {
                  setSelectedAccountKey(provider.key);
                  if (linkedAccount) {
                    executeUnlink({
                      providerId: linkedAccount.provider,
                      accountId: linkedAccount.accountId,
                    });
                  } else {
                    handleLinkProvider(provider.key);
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
