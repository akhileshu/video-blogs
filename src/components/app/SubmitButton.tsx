"use client";
import { LoaderCircle } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type SubmitButtonProps= ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string;
  pendingText?: string;
  icon?: React.ReactNode;
  isPending: boolean;
  disabled: boolean;
  className?: string;
};

export default function SubmitButton({
  text,
  pendingText,
  icon,
  isPending,
  className = "",
  disabled,
  ...props
}: SubmitButtonProps) {
  return (
    <Button
      {...props}
      disabled={disabled}
      type="submit"
      className={cn("", className)}
    >
      {isPending ? (
        <span className="flex gap-1 items-center">
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          {pendingText ?? null}
        </span>
      ) : (
        <span className="flex gap-1 items-center">
          {icon ?? null}
          {text ?? null}
        </span>
      )}
    </Button>
  );
}

