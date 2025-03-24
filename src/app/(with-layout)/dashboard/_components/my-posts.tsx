import { AppCard } from "@/components/app/card";
import { getMessage } from "@/features/message/lib/get-message";
import { getPosts } from "@/features/post/actions/postActions";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeletePostForm from "@/features/post/components/forms/DeletePostButton";

export async function MyPosts({ className }: { className?: string }) {
  const posts = await getPosts();

  return (
    <AppCard
      info={{
        show: posts.length === 0,
        message: getMessage("post", "NO_OWN_POSTS"),
      }}
      title="My Posts"
      className={cn("", className)}
    >
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
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell>
                {new Date(post.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right flex gap-3 justify-end">
                <Link
                  href={`/posts/${post.slug}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  View
                </Link>
                <Link
                  href={`/posts/${post.slug}/edit`}
                  className="text-green-600 hover:underline text-sm"
                >
                  Edit
                </Link>
                <DeletePostForm postId={post.id}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </AppCard>
  );
}
