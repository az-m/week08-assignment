import { db } from "@/utils/dbconnection";
import Comments from "@/components/Comments";
import AddComment from "@/components/AddComment";

export default async function Post({ params }) {
  const slug = await params;

  const post = (
    await db.query(
      `SELECT posts.id, posts.title, posts.content, posts.posted_at, categories.name AS category FROM posts JOIN categories ON category_id = categories.id WHERE posts.id = $1`,
      [slug.id]
    )
  ).rows[0];

  const splitContent = post.content.split("<br />");

  return (
    <section className="flex flex-col justify-self-center gap-2 w-sm md:w-md lg:w-lg xl:w-xl bg-content-panel mt-10 md:rounded-md">
      <div>
        <p className="p-2 border-b border-content-border opacity-80">
          {post.posted_at.toDateString()}
        </p>
        <h2 className="font-bold pt-2 pl-4 pr-4 text-lg lg:text-xl">
          {post.title}
        </h2>
        {splitContent.map((para, index) => (
          <p key={index} className="pl-4 pr-4 pt-2 pb-2 lg:text-lg">
            {para}
          </p>
        ))}
      </div>
      <AddComment postID={post.id} />
      <Comments postID={post.id} />
    </section>
  );
}
