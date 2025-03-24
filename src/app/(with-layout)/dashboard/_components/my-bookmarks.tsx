"use client";
import { Info } from "@/components/app/info";
import { getMessage } from "@/features/message/lib/get-message";
import { getBookmarkedPosts } from "@/features/post/actions/postActions";
import ToggleBookmarkForm from "@/features/post/components/forms/BookmarkButton";
import { useEffect } from "react";
import { toast } from "sonner";

export default function MyBookmarks({
  bookmarkedPostsResult: { data, message },
}: {
  bookmarkedPostsResult: Awaited<ReturnType<typeof getBookmarkedPosts>>;
}) {
  useEffect(() => {
    if (message?.type === "error") toast.error(message.text);
    else if (message?.type === "warning") toast.warning(message.text);
  }, [message]);
  if (!data) return <Info message={message} />;
  else if (data.length === 0)
  return <Info message={getMessage("bookmark", "NO_OWN_BOOKMARKS")} />;
  return (
    <div className="grid gap-4">
      {data.map((bookmark) => (
        <div key={bookmark.post.id} className="p-4 border rounded-lg shadow">
          <h2 className="text-xl font-bold">{bookmark.post.title}</h2>
          <p>{bookmark.post.content.slice(0, 100)}...</p>
          <ToggleBookmarkForm isBookmarked postId={bookmark.post.id} />
        </div>
      ))}
    </div>
  );
}
