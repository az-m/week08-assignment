import Link from "next/link";
import { db } from "@/utils/dbconnection";

export default async function PostList({ sortOrder, category }) {
  let posts = [];
  let order = "a-z";

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
    order = "a-z";
  } else if (sortOrder === "desc") {
    posts.sort((a, b) => {
      return b.title.localeCompare(a.title);
    });
    sortOrder = "asc";
    order = "z-a";
  }

  return (
    <div className="flex flex-col items-center mt-5">
      <Link
        href={`/posts?sort=${sortOrder}&cat=${category}`}
        className="border text-foreground-reverse text-center pl-2 pr-2 hover:text-link-hover"
      >
        {order}
      </Link>
      <ul className="mt-5 p-5 bg-content-panel w-sm md:w-md lg:w-lg xl:w-xl md:rounded-md">
        {posts.map((post) => (
          <li
            key={post.id}
            className="border-b border-content-border pt-1 pb-1 md:text-lg last-of-type:border-none"
          >
            <Link
              href={`/post/${post.id}`}
              className="text-link-reverse hover:text-link-hover-reverse"
            >
              {post.title}
            </Link>
            <p className="text-xs md:text-sm text-right pt-2">
              {post.category}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
