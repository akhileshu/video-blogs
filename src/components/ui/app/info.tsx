import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";

export function Info({
  className,
  text,
}: {
  className?: string;
  text: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-3 border border-blue-200 bg-blue-50 text-blue-800 rounded-md text-sm",
        className
      )}
    >
      <InfoIcon size={18} />
      <span>{text}</span>
    </div>
  );
}
