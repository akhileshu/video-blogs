"use client";

import Auth from "@/features/auth/components";

import { useRouter } from "next/navigation";
import { Search } from "../posts/_components/search";
import { getInternalHref } from "@/lib/getInternalHref";
import { AppLink } from "@/components/app/link";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="w-full p-1 flex justify-between items-center border-b">
      <h1
        onClick={() => router.push("/")}
        className="text-xl cursor-pointer font-bold"
      >
        MyApp
      </h1>
      <AppLink
        href={getInternalHref("post", "create")}
      >
        Create Post
      </AppLink>
      <Search />
      <Auth />
    </nav>
  );
}
