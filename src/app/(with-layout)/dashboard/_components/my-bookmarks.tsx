import { AppCard } from "@/components/ui/app/card";
import { getMessage } from "@/features/message/lib/get-message";
import { cn } from "@/lib/utils";

export function MyBookmarks({className}:{className?:string}){
    const myBookmarksCount=0;
    return (
      <AppCard
        info={{
          show: myBookmarksCount===0,
          message:getMessage("bookmark","NO_OWN_BOOKMARKS")
        }}
        title="My Bookmarks"
        className={cn("", className)}
      >
        {" "}
        Lorem ipsum dolor sit.
      </AppCard>
    );
}