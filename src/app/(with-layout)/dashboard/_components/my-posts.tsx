import { AppCard } from "@/components/app/card";
import { Info } from "@/components/app/info";
import { AppLink } from "@/components/app/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMessage } from "@/features/message/lib/get-message";
import { getLoggedInUsersPosts } from "@/features/post/actions/postActions";
import DeletePostForm from "@/features/post/components/forms/DeletePostButton";
import { cn } from "@/lib/utils";

export async function MyPosts({ className }: { className?: string }) {
  const { data: posts, message } = await getLoggedInUsersPosts();
  if (message?.type === "warning") return <Info message={message} />;
  else if (!posts || posts.length === 0)
    return <Info message={getMessage("post", "NO_OWN_POSTS")} />;

  return (
    <AppCard title="My Posts" className={cn("border-0", className)}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created On</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">
                <AppLink
                  className="after:transition-none"
                  href={`/posts/${post.slug}`}
                >
                  {post.title}
                </AppLink>
              </TableCell>
              <TableCell>
                {new Date(post.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right flex gap-3 justify-end">
                <AppLink
                  href={`/posts/${post.slug}/edit`}
                >
                  Edit
                </AppLink>
                <DeletePostForm postId={post.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppCard>
  );
}
