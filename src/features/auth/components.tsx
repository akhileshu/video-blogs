"use client";
import { Button } from "@/components/app/button";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Auth() {
  const router=useRouter()
  const { data: session, status } = useSession();
  if (status === "loading") return <p>Loading...</p>;
  if (status === "authenticated") {
    console.log(session?.user?.id ?? "No ID");
  }

  return (
    <div>
      {session ? (
        <div className="flex gap-1">
          <Image
          onClick={()=>router.push("/dashboard")}
            alt="user-img"
            src={session.user.image}
            width={40}
            height={40}
            className="aspect-square rounded-full"
          />
          <Button onClick={() => signOut()}>Sign Out</Button>
        </div>
      ) : (
        <Button onClick={() => signIn("google")}>Sign In with Google</Button>
      )}
    </div>
  );
}
