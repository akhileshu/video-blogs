"use client";
import { Button } from "@/components/app/button";
import { AppLink } from "@/components/app/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function Auth() {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>Loading...</p>;
  if (status === "authenticated") {
    console.log(session?.user?.id ?? "No ID");
  }

  return (
    <div>
      {session ? (
        <div className="flex gap-1 items-center">
          <AppLink className="after:transition-none after:hidden" href={"/dashboard"}>
            <Image
              alt="user-img"
              src={session.user.image}
              width={40}
              height={40}
              className="aspect-square rounded-full"
            />
          </AppLink>
          <LogoutButton />
        </div>
      ) : (
        <Button onClick={() => signIn("google")}>Sign In with Google</Button>
      )}
    </div>
  );
}

function LogoutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut({ redirect: false });
    router.refresh(); // Clear client-side cache and re-render
  }

  return <Button onClick={handleSignOut}>Sign Out</Button>;
}
