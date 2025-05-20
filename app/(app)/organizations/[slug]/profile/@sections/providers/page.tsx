import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ListProviders from "./list-providers";

export default async function ProvidersPage() {
  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });

  return <ListProviders accounts={accounts} />;
}
