"use client";
import { LoaderCircle } from "lucide-react";
import React, { ButtonHTMLAttributes } from "react";
import { Button } from "./button";

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
    <Button {...props} disabled={disabled} type="submit" className={className}>
      {isPending ? (
        <>
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          {pendingText ?? null}
        </>
      ) : (
        <>
          {icon ?? null}
          {text ?? null}
        </>
      )}
    </Button>
  );
}

