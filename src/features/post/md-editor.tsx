"use client";

import MDEditor from "@uiw/react-md-editor";
import { Dispatch, SetStateAction } from "react";
import { TOC } from "./generateTOC";
import ToggleBookmarkForm from "./components/forms/BookmarkButton";
import { ShareButton } from "@/app/(with-layout)/dashboard/_components/my-bookmarks";

export default function MdEditor({
  content,
  setContent,
  isEditing,
  postId,
  isBookmarked,
}: {
  content: string;
  postId?: number;
  isEditing?: boolean;
  isBookmarked?: boolean;
  setContent?: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex">
      <div className="min-w-60">
        <TOC className="p-4" content={content} />
        <div className="flex gap-2">
          {!isEditing && postId && isBookmarked !== undefined ? (
            <ToggleBookmarkForm isBookmarked={isBookmarked} postId={postId} />
          ) : null}
          <ShareButton slug={""}/>
        </div>
      </div>
      {isEditing && setContent ? (
        <>
          <MDEditor
            value={content}
            onChange={(val) => {
              setContent(val || "");
            }}
            height={"100vh"}
            className="w-full"
          />
        </>
      ) : (
        <MDEditor.Markdown
          source={content}
          className="rounded-md p-3 pl-6"
          style={{ whiteSpace: "pre-wrap"}}
        />
      )}
    </div>
  );
}
