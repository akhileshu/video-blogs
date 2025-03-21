import { AppMessage } from "@/features/message/lib/define-messages";
import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";

export function Info({
  className,
  message,
}: {
  className?: string;
  message: AppMessage;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 p-3 border border-blue-200 bg-blue-50 text-blue-800 rounded-md text-sm",
        className
      )}
    >
      <InfoIcon size={18} />
      <span>{message.text}</span>
    </div>
  );
}
