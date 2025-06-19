import Link from "next/link";
import { db } from "@/utils/dbconnection";

export default async function Post({ params }) {
  const slug = await params;

  const post = (
    await db.query(
      `SELECT posts.id, posts.title, posts.content, categories.name AS category FROM posts JOIN categories ON category_id = categories.id WHERE posts.id = $1`,
      [slug.id]
    )
  ).rows[0];

  return (
    <div>
      <h2>Post {post.id}</h2>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
      <Link href="/posts">Back to posts</Link>
    </div>
  );
}
