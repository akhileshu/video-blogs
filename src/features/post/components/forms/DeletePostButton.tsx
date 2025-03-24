"use client";
import { useActionState, useEffect } from "react";
import { deletePost } from "../../actions/postActions";
import { Button } from "@/components/app/button";
import { toast } from "sonner";

export default function DeletePostForm({ postId }: { postId: number }) {
  const [state, formAction, isPending] = useActionState(deletePost, undefined);
  const { fieldErrors, message } = state ?? {};

  useEffect(() => {
    if (message?.type === "success") {
      toast.success(message.text);
    } else if (message?.type === "error") toast.error(message.text);
    else if (message?.type === "warning") toast.warning(message.text);
    else if (fieldErrors) toast.error(fieldErrors.id);
  }, [fieldErrors, message]);
  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={postId} />
      <Button type="submit" disabled={isPending} className="text-red-500">
        Delete
      </Button>
    </form>
  );
}
