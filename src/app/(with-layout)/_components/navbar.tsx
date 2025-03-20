"use client";

import Auth from "@/features/auth/components";
import { Search } from "../content/_components/search";
import { useRouter } from "next/navigation";

export default function Navbar() {
const router=useRouter()
  return (
    <nav className="w-full p-2 shadow flex justify-between items-center">
      <h1 onClick={()=>router.push("/")} className="text-xl cursor-pointer font-bold">MyApp</h1>
      <Search/>
      <Auth/>
    </nav>
  );
}
