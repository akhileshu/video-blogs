"use client";

import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

import SubmitButton from "@/components/app/SubmitButton";
import { createPost, updatePost } from "@/features/post/actions/postActions";
import MdEditor from "@/features/post/md-editor";
import { Post } from "@prisma/client";

interface CreateOrEditProps {
  post?: Post;
}

export default function CreateOrEditPostForm({ post }: CreateOrEditProps) {
  const isEdit = !!post;
  const placeholderMDContent = `Start writing your amazing content here...`;
  const [content, setContent] = useState(post?.content ?? placeholderMDContent);
  const [title, setTitle] = useState(post?.title ?? "");
  const router = useRouter();
  const actionFn = isEdit ? updatePost : createPost;
  // @ts-expect-error : usage of conditional actionFn causing issue , makesure to maintain similar types for both the actionFn's
  const [state, formAction, isPending] = useActionState(actionFn, undefined);
  const { fieldErrors, message } = state ?? {};

  useEffect(() => {
    if (message?.type === "success") {
      toast.success(message.text);
      router.push("/dashboard");
    } else if (message?.type === "error") toast.error(message.text);
    else if (message?.type === "warning") toast.warning(message.text);
  }, [message, router]);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={post?.id ?? ""} />
      <div className="flex gap-2">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
          className="w-sm rounded-sm py-1 px-2 border border-blue-400 focus:border-2 focus:border-blue-400 outline-none"
        />
        {fieldErrors?.title && (
          <p className="text-red-500 text-sm">{fieldErrors.title.join(", ")}</p>
        )}
        <input type="hidden" name="content" value={content} />
        <SubmitButton
          disabled={
            isPending ||
            !content ||
            content === placeholderMDContent ||
            !title.trim()
          }
          text={isEdit ? "Update" : "Save"}
          icon={<ArrowRight />}
          pendingText={isEdit ? "Updating..." : "Saving..."}
          isPending={isPending}
          className="self-start"
        />
      </div>

      <div>
        <MdEditor isEditing setContent={setContent} content={content} />
        {fieldErrors?.content && (
          <p className="text-red-500 text-sm mt-1">
            {fieldErrors.content.join(", ")}
          </p>
        )}
      </div>
    </form>
  );
}
