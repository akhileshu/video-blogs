import { getBookmarkedPosts } from "@/features/post/actions/postActions";
import { MyPosts } from "./_components/my-posts";
import { MyProfile } from "./_components/my-profile";
import MyBookmarks from "./_components/my-bookmarks";

export default async function Page() {
  const bookmarkedPostsResult= await getBookmarkedPosts()
  return (
    <main>
      <MyProfile />
      <MyPosts />
      <MyBookmarks bookmarkedPostsResult={bookmarkedPostsResult} />
    </main>
  );
}

