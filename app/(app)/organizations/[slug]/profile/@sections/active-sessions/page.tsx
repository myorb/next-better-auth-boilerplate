import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { headers } from "next/headers";
import ListSessions from "./list-sessions";

export default async function ActiveSessions() {
  const sessions = await auth.api.listSessions({
    headers: await headers(),
  });

  const currentSession = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <ListSessions
      sessions={sessions}
      currentSessionId={currentSession?.session.id ?? ""}
    />
  );
}
