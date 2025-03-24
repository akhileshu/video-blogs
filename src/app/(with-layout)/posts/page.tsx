import { AppLink } from "@/components/app/link";
import { getPosts } from "@/features/post/actions/postActions";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const { query } = await searchParams;
  const posts = await getPosts(query);

  return (
    <main className="p-4">
      <h1 className="text-xl mb-4">
        Results for <span className="font-bold">{query}</span>
      </h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded-md">
              <AppLink
                className="after:transition-none"
                href={`/posts/${post.slug}`}
              >
                <h2 className="font-semibold text-lg">{post.title}</h2>
              </AppLink>
              <p className="text-sm text-gray-600 mb-1">
                by {post.author.name ?? "Unknown"} on{" "}
                {post.createdAt.toLocaleDateString()}
              </p>
              <p className="text-gray-700">{post.content.slice(0, 100)}...</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
