import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const previewText = (content: string, length = 100) =>
  content?.length > length ? `${content.slice(0, length)}...` : content;

export const formatDate = (date: Date) => new Date(date).toLocaleDateString();







