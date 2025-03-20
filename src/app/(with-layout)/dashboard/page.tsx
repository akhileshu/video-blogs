import { MyBookmarks } from "./_components/my-bookmarks";
import { MyPosts } from "./_components/my-posts";
import { MyProfile } from "./_components/my-profile";

export default function Page() {
  return (
    <main>
      <MyProfile/>
      <MyPosts/>
      <MyBookmarks/>
    </main>
  );
}

