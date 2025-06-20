import { db } from "@/utils/dbconnection";
import EditComment from "@/components/EditComment";

export default async function EditCommentPage({ params }) {
  const slug = await params;

  const comment = (
    await db.query(
      `SELECT comments.id, comments.name, comments.content FROM comments WHERE comments.id = $1`,
      [slug.cid]
    )
  ).rows[0];

  return (
    <section className="flex flex-col justify-self-center gap-2 w-sm md:w-md lg:w-lg xl:w-xl bg-content-panel mt-10 md:rounded-md">
      <EditComment
        postID={slug.id}
        commentID={comment.id}
        nameValue={comment.name}
        contentValue={comment.content}
      />
    </section>
  );
}
