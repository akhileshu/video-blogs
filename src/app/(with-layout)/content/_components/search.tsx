import { cn } from "@/lib/utils";

export function Search({ className }: { className?: string }) {
  return (
    <div className={cn("", className)}>
      <input
        type="text"
        className="w-sm rounded-sm py-1 px-2 border-1 border-blue-400 focus-within:border-2 focus-within:border-blue-400 outline-none"
        name="query"
        id="query"
        placeholder="search posts"
      />
    </div>
  );
}
