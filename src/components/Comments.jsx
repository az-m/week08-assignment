import { db } from "@/utils/dbconnection";

export default async function Comments({ postID }) {
  const comments = (
    await db.query(
      `SELECT comments.id, comments.name, comments.content, comments.posted_at FROM comments WHERE comments.post_id = $1`,
      [postID]
    )
  ).rows;

  return (
    <div>
      <ul className="p-4">
        {comments.map((comment) => (
          <li key={comment.id} className="pb-4">
            <p>
              <span className="font-semibold">{comment.name}</span>
              <span className="ml-2 text-sm opacity-80">
                {comment.posted_at.toLocaleDateString()}
              </span>
            </p>
            <p>{comment.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
