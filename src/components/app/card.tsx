import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { Info } from "./info";
import { AppMessage } from "@/features/message/lib/define-messages";

export function AppCard({
  title,
  children,
  className,
  info,
}: {
  title: string;
  children?: ReactNode;
  className?: string;
  info?: { show: boolean; message: AppMessage };
}) {
  return (
    <div className={cn("p-4 m-2 bg-white border-1 rounded-sm", className)}>
      <p className="font-semibold text-lg mb-1">{title}</p>
      {info?.show ? <Info message={info.message} /> : children}
    </div>
  );
}