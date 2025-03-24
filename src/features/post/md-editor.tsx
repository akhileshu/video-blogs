"use client";

import MDEditor from "@uiw/react-md-editor";
import { Dispatch, SetStateAction } from "react";
import { TOC } from "./generateTOC";
import ToggleBookmarkForm from "./components/forms/BookmarkButton";

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
        {!isEditing && postId && isBookmarked !== undefined ? (
          <ToggleBookmarkForm isBookmarked={isBookmarked} postId={postId} />
        ) : null}
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
          style={{ whiteSpace: "pre-wrap", padding: "5px" }}
        />
      )}
    </div>
  );
}
