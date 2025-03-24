"use client";
import { Button } from "@/components/app/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Auth() {
  const { data: session, status } = useSession();
  if (status === "loading") return <p>Loading...</p>;
  if (status === "authenticated") {
    console.log(session?.user?.id ?? "No ID");
  }

  return (
    <div>
      {session ? (
        <div className="flex gap-1">
          <Link href={"/dashboard"}>
            <Image
              alt="user-img"
              src={session.user.image}
              width={40}
              height={40}
              className="aspect-square rounded-full"
            />
          </Link>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      ) : (
        <Button onClick={() => signIn("google")}>Sign In with Google</Button>
      )}
    </div>
  );
}
