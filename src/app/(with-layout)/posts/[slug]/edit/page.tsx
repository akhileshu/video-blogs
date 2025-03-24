import { Info } from "@/components/app/info";
import { getPostBySlug } from "@/features/post/actions/postActions";
import CreateOrEditPostForm from "@/features/post/components/forms/createOrEdit";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getPostBySlug(slug);
  const { data: post, message } = result || {};
  if (message && !post) return <Info message={message} />;

  return <CreateOrEditPostForm post={post} />;
}
