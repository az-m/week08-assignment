import Link from "next/link";
import { db } from "@/utils/dbconnection";

export default async function HomePage() {
  const post = (
    await db.query(
      `SELECT posts.id, posts.title, posts.content FROM posts ORDER BY posts.posted_at DESC LIMIT 1`
    )
  ).rows[0];

  let content = post.content.slice(0, 200) + "...";

  return (
    <div className="flex flex-col justify-self-center gap-2 items-center w-sm md:w-md lg:w-lg xl:w-xl mt-10 p-4 text-lg">
      <p>{post.title}</p>
      <p className="mb-5 border-l border-r pl-4 pr-4 border-content-border">
        {content}
      </p>

      <p>
        <Link href={`/post/${post.id}`} className="hover:text-sky-500 text-xl">
          Latest Post
        </Link>
      </p>
    </div>
  );
}
