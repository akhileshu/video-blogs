import { AppCard } from "@/components/ui/app/card";
import { cn } from "@/lib/utils";

export function MyBookmarks({className}:{className?:string}){
    return <AppCard title="My Bookmarks" className={cn("", className)}> Lorem ipsum dolor sit.</AppCard>;
}