import { db } from "@/utils/dbconnection";

export default async function Comments({ postID }) {
  const comments = (
    await db.query(
      `SELECT comments.id, comments.name, comments.content FROM comments WHERE comments.post_id = $1`,
      [postID]
    )
  ).rows;

  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            {comment.name} {comment.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
