import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ChangePassword from "./change-password";
import SetPassword from "./set-password";

export default async function Security() {
  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });

  const isCredentialProvider = accounts.some(
    (account) => account.provider === "credential"
  );

  return (
    <div className="flex flex-col gap-4">
      {isCredentialProvider ? <ChangePassword /> : <SetPassword />}
    </div>
  );
}
