"use client";
import { useActionState, useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { toggleBookmark } from "../../actions/postActions";
import { toast } from "sonner";
import { Button } from "@/components/app/button";
import { useRouter } from "next/navigation";

export default function ToggleBookmarkForm({
  postId,
  isBookmarked,
}: {
  postId: number;
  isBookmarked: boolean;
}) {
  const [localBookmarked, setLocalBookmarked] = useState(isBookmarked);
  const [state, formAction, isPending] = useActionState(
    toggleBookmark,
    undefined
  );
  const { bookmarked, fieldErrors, message } = state ?? {};
  const router = useRouter();
  useEffect(() => {
    if (message?.type === "success" && bookmarked !== undefined) {
      toast.success(message.text);
      // used router.refresh() instead of revalidatePath()
      // to show toast on client before triggering revalidation
      router.refresh();
      setLocalBookmarked(bookmarked);
    } else if (message?.type === "error") toast.error(message.text);
    else if (message?.type === "warning") toast.warning(message.text);
    else if (fieldErrors) toast.error(fieldErrors.postId);
  }, [bookmarked, fieldErrors, message, router]);

  return (
    <form action={formAction}>
      <input type="hidden" name="postId" value={postId} />
      <Button disabled={isPending} type="submit">
        {localBookmarked ? (
          <FaBookmark className="text-yellow-500" />
        ) : (
          <FaRegBookmark />
        )}
      </Button>
    </form>
  );
}
