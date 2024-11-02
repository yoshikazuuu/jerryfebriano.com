import path from "path";
import WritingsPageClient from "./page.client";
import { getAllPostsMetadata } from "@/utils/mdx-utils";
import { PostList } from "@/components/post-list";

export default async function WritingsPage() {
  const dir = path.join(process.cwd(), "src/app/writings");
  const postsWithMetadata = await getAllPostsMetadata(dir);

  return (
    <WritingsPageClient>
      <PostList posts={postsWithMetadata} />
    </WritingsPageClient>
  );
}
