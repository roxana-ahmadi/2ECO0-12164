import { IPostListProps } from "./types";

export default function PostList({ posts }: IPostListProps) {
  return (
    <>
      {posts.map((item) => (
        <div>{item.title}</div>
      ))}
    </>
  );
}
