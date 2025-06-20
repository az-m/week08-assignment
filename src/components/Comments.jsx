import { db } from "@/utils/dbconnection";
import CommentOptions from "./CommentOptions";

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
          <li key={comment.id} className="pb-4 grid grid-cols-2">
            <div className="col-start-1 col-span-1">
              <p>
                <span className="font-semibold">{comment.name}</span>
                <span className="ml-2 text-sm opacity-80">
                  {comment.posted_at.toLocaleDateString()}
                </span>
              </p>
              <p className="col-start-1 col-span-2 row-start-2 row-span-1">
                {comment.content}
              </p>
            </div>
            <div className="col-start-2 col-span-1 justify-items-end">
              <CommentOptions postID={postID} commentID={comment.id} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
