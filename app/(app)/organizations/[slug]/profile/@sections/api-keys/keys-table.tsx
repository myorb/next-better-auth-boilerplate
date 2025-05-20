import { authClient } from "@/lib/auth-client";

export default async function KeysTable() {
  const { data: apiKeys } = await authClient.apiKey.list();
  return <div>{apiKeys?.map((key) => <div key={key.id}>{key.name}</div>)}</div>;
}
