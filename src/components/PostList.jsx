import Link from "next/link";
import { db } from "@/utils/dbconnection";

export default async function PostList({ sortOrder, category }) {
  let posts = [];

  if (category === "all") {
    posts = (
      await db.query(
        `SELECT posts.id, posts.title, categories.name AS category FROM posts JOIN categories ON category_id = categories.id`
      )
    ).rows;
  } else {
    posts = (
      await db.query(
        `SELECT posts.id, posts.title, categories.name AS category FROM posts JOIN categories ON category_id = categories.id WHERE category_id = $1`,
        [category]
      )
    ).rows;
  }

  if (sortOrder === "asc") {
    posts.sort((a, b) => {
      return a.title.localeCompare(b.title);
    });
    sortOrder = "desc";
  } else if (sortOrder === "desc") {
    posts.sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
    sortOrder = "asc";
  }

  return (
    <div>
      <Link href={`/posts?sort=${sortOrder}&cat=${category}`}>
        Sort {sortOrder}
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>
              {post.title} {post.category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
