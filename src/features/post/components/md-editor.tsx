"use client";

import MDEditor from "@uiw/react-md-editor";
import { Dispatch, SetStateAction } from "react";
import { CopyPostLinkButton } from "./copy-post-link-btn";
import ToggleBookmarkForm from "./forms/BookmarkButton";
import { TOC } from "./generateTOC";

export default function MdEditor({
  content,
  setContent,
  isEditing,
  postId,
  postSlug,
}: {
  content: string;
  postId?: number;
  postSlug?: string;
  isEditing?: boolean;
  setContent?: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="flex">
      <div className="min-w-60">
        <TOC className="p-4" content={content} />
        <div className="flex gap-2">
          {!isEditing && postId ? (
            <>
              <ToggleBookmarkForm postId={postId} />{" "}
              <CopyPostLinkButton slug={postSlug ?? ""} />
            </>
          ) : null}
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
          style={{ whiteSpace: "pre-wrap" }}
        />
      )}
    </div>
  );
}
