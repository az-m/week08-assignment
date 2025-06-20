import { db } from "@/utils/dbconnection";
import { redirect } from "next/navigation";

export default async function Delete({ searchParams }) {
  const params = await searchParams;
  let postID = parseInt(params.postID);
  let commentID = parseInt(params.commentID);

  if (commentID) {
    db.query(`DELETE FROM comments WHERE id = $1`, [commentID]);
    redirect("/posts");
  }

  if (postID) {
    db.query(`DELETE FROM posts WHERE id = $1`, [postID]);
    redirect("/posts");
  }

  return <p className="text-center">Deleted. Redirecting ...</p>;
}
