import { AppCard } from "@/components/ui/app/card";
import { getMessage } from "@/features/message/lib/get-message";
import { cn } from "@/lib/utils";

export function MyPosts({className}:{className?:string}){
  const myPostsCount = 0;
    return (
      <AppCard
        info={{
          show: myPostsCount === 0,
          message: getMessage("post", "NO_OWN_POSTS"),
        }}
        title="My Posts"
        className={cn("", className)}
      >
        {" "}
        Lorem ipsum dolor sit.
      </AppCard>
    );
}