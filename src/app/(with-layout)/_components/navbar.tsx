"use client";

import Auth from "@/features/auth/components";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search } from "../posts/_components/search";
import { getInternalHref } from "@/lib/getInternalHref";

export default function Navbar() {
const router=useRouter()
  return (
    <nav className="w-full p-2 shadow flex justify-between items-center">
      <h1
        onClick={() => router.push("/")}
        className="text-xl cursor-pointer font-bold"
      >
        MyApp
      </h1>
      <Link
        className="border-2 rounded-sm px-4 py-2 border-blue-600 text-blue-600"
        href={getInternalHref("post", "create")}
      >
        Create Post
      </Link>
      <Search />
      <Auth />
    </nav>
  );
}
