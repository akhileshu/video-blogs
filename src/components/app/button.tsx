import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "flex items-center justify-center rounded-md font-medium transition-all",
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
          "bg-gray-600 text-white hover:bg-gray-700": variant === "secondary",
          "bg-red-600 text-white hover:bg-red-700": variant === "danger",
        },
        {
          "px-3 py-1 text-sm": size === "sm",
          "px-4 py-2 text-base": size === "md",
          "px-5 py-3 text-lg": size === "lg",
        },
        className
      )}
      {...props}
    >
      {leftIcon && <span>{leftIcon}</span>}
      {children}
      {rightIcon && <span>{rightIcon}</span>}
    </button>
  );
}
