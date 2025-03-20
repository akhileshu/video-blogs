"use client";

import { Session } from "next-auth";
import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode, useEffect, useRef } from "react";

// ✅ Issue fixed:
// - On the server, we must pass authOptions to getServerSession() to get custom fields like user.id.
// - On the client, we added a ForceSessionUpdate component to refresh the session after mount.
// This ensures the session is always up-to-date with our custom fields both server-side and client-side.

// my bad - issue was not passing authOptions for SessionProvider , we dont need manual session update

function ForceSessionUpdate() {
  const { update } = useSession();
  const hasUpdated = useRef(false);

  useEffect(() => {
    if (!hasUpdated.current) {
      update();
      hasUpdated.current = true;
    }
  }, [update]);

  return null;
}



export default function AuthSessionProvider({
  children,
  session,
}: {
  children: ReactNode;
  session?: Session | null | undefined;
}) {
  
  return (
    <SessionProvider session={session}>
      {/* <ForceSessionUpdate /> */}
      {children}
    </SessionProvider>
  );
}
