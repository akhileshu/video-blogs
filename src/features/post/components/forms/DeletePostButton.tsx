"use client";
import { Button } from "@/components/app/button";
import { useHandleFormState } from "@/lib/useHandleFormState";
import { useActionState } from "react";
import { deletePost } from "../../actions/postActions";
import { confirmBeforeSubmit } from "@/components/app/SubmitButton";
import { initialState } from "@/lib/handleAction";

export default function DeletePostForm({ postId }: { postId: number }) {
  const [state, formAction, isPending] = useActionState(
    deletePost,
    initialState
  );
  const handleConfirm = confirmBeforeSubmit(
    "Are you sure you want to delete this post?"
  );

  useHandleFormState({
    state,
    revalidatePath: "/dashboard",
  });

  return (
    <form onSubmit={handleConfirm} action={formAction}>
      <input type="hidden" name="id" value={postId} />
      <Button type="submit" disabled={isPending} className="text-red-500">
        Delete
      </Button>
    </form>
  );
}
