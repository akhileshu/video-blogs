import { AppCard } from "@/components/ui/app/card";
import { cn } from "@/lib/utils";

export function MyPosts({className}:{className?:string}){
    return (
      <AppCard title="My Posts" className={cn("", className)}>
        {" "}
        Lorem ipsum dolor sit.
      </AppCard>
    );
}