"use client";
import { Button } from "@/components/app/button";
import { AppCard } from "@/components/app/card";
import { Info } from "@/components/app/info";
import { AppLink } from "@/components/app/link";
import { getMessage } from "@/features/message/lib/get-message";
import { getBookmarkedPosts } from "@/features/post/actions/postActions";
import ToggleBookmarkForm from "@/features/post/components/forms/BookmarkButton";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { toast } from "sonner";

type MyBookmarksProps = {
  bookmarkedPostsResult: Awaited<ReturnType<typeof getBookmarkedPosts>>;
  className?: string;
};

export default function MyBookmarks({
  bookmarkedPostsResult: { data, message },
  className,
}: MyBookmarksProps) {
  useEffect(() => {
    if (message?.type === "error") toast.error(message.text);
    else if (message?.type === "warning") toast.warning(message.text);
  }, [message]);

  if (!data) return <Info message={message} />;
  if (data.length === 0)
    return <Info message={getMessage("bookmark", "NO_OWN_BOOKMARKS")} />;

  return (
    <AppCard title="My Bookmarks" className={cn("border-0", className)}>
      <div className="divide-y">
        {data.map((bookmark) => (
          <div
            key={bookmark.id}
            className="py-3 px-2 flex justify-between items-center hover:bg-muted/50 transition rounded-md"
          >
            <div className="overflow-hidden">
              <h2 className="text-base font-medium">
                <AppLink
                  className="after:transition-none"
                  href={`/posts/${bookmark.post.slug}`}
                >
                  {bookmark.post.title}
                </AppLink>
              </h2>
              <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                {previewText(bookmark.post.content, 50)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ShareButton slug={bookmark.post.slug} />
              <ToggleBookmarkForm isBookmarked postId={bookmark.post.id} />
            </div>
          </div>
        ))}
      </div>
    </AppCard>
  );
}

// ✅ Utility for safe content preview
const previewText = (content: string, length = 100) =>
  content?.length > length ? `${content.slice(0, length)}...` : content;

export function ShareButton({ slug }: { slug: string }) {
  const handleShare = () => {
    const url = `${window.location.origin}/posts/${slug}`;
    navigator.clipboard.writeText(url);
    toast.success("Post link copied to clipboard!");
  };

  return (
    <Button
      onClick={handleShare}
    >
      Share
    </Button>
  );
}
