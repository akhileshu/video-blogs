"use client";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function Search({ className }: { className?: string }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim())
      router.push(`posts?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("", className)}>
      <input
        type="text"
        className="w-sm rounded-sm py-1 px-2 border-1 border-blue-400 focus-within:border-2 focus-within:border-blue-400 outline-none"
        name="query"
        id="query"
        placeholder="search posts"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
