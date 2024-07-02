import PostList from "@/components/PostList/PostList";
import AddPostForm from "@/components/AddPost/AddPostForm";

export default async function PostsPage() {
  const response = await fetch(
    "https://dummyjson.com/posts?limit=10&sortBy=title&order=asc"
  );
  const data = await response.json();

  return (
    <div className="flex flex-col gap-2 items-center justify-center">
      <AddPostForm />
      <h1 className="border-b-2">All Posts</h1>
      <PostList posts={data.posts} />
    </div>
  );
}
