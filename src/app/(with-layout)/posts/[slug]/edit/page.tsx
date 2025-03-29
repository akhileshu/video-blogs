import { renderStatusMessage } from "@/components/app/renderStatusMessage";
import { getPostBySlug } from "@/features/post/actions/postActions";
import CreateOrEditPostForm from "@/features/post/components/forms/createOrEdit";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const postResult = await getPostBySlug(slug);
  const statusMessage = renderStatusMessage(postResult);
  if (statusMessage || !postResult.ok) return statusMessage;
  const { data: post, } = postResult;

  return <CreateOrEditPostForm post={post} />;
}
