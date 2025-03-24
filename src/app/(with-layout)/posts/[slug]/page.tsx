import { AppCard } from "@/components/app/card";
import { Info } from "@/components/app/info";
import {
  getPostBySlug,
  isPostBookmarked,
} from "@/features/post/actions/postActions";
import MdEditor from "@/features/post/md-editor";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);
  const { data: post, message } = result || {};
  if (message && !post) return <Info message={message} />;

  const isBookmarked = await isPostBookmarked(post.id);
  return (
    <AppCard title={post.title}>
      <div className="mb-4 text-sm text-muted-foreground flex gap-2">
        <p>
          By <strong>{post.author.name}</strong>
        </p>
        <p>Created on: {new Date(post.createdAt).toLocaleDateString()}</p>
        {post.updatedAt !== post.createdAt && (
          <p>Updated on: {new Date(post.updatedAt).toLocaleDateString()}</p>
        )}
      </div>

      <MdEditor
        isBookmarked={isBookmarked.bookmarked}
        postId={post.id}
        content={post.content}
      />
    </AppCard>
  );
}
