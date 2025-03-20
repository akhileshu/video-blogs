"use client";

import Auth from "@/features/auth/components";

export default function Navbar() {

  return (
    <nav className="w-full p-4 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">MyApp</h1>
      <Auth/>
    </nav>
  );
}
