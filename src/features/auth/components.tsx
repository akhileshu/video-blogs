"use client"
import { Button } from "@/components/ui/app/button";
import { useRouter } from "next/navigation";

export function GetStartedAuthButton(){
    const router= useRouter()
    return <Button onClick={()=>router.push("/content")} >Get Started</Button>;
}