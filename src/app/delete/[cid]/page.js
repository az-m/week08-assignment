import { db } from "@/utils/dbconnection";
import { redirect } from "next/navigation";

export default async function DeleteComment({ params }) {
  const slug = await params;

  db.query(`DELETE FROM comments WHERE id = $1`, [slug.cid]);
  redirect("/posts");
  return <></>;
}
