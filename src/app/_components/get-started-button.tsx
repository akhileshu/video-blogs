"use client"

import { Button } from "@/components/ui/app/button";
import { useRouter } from "next/navigation";

export function GetStartedButton() {
  const router = useRouter();
  return <Button onClick={() => router.push("/content")}>Get Started</Button>;
}