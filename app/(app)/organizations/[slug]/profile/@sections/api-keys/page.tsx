import { auth } from "@/lib/auth";
import console from "console";
import { headers } from "next/headers";
import KeysTable from "./keys-table";
import { authClient } from "@/lib/auth-client";

export default async function ApiKeys() {
  return <KeysTable />;
}
