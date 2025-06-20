import { revalidatePath } from "next/cache";
import { db } from "@/utils/dbconnection";
import CommentForm from "./CommentForm";

export default function AddComment({ postID }) {
  async function handleSaveComment(formData) {
    "use server";

    const data = {
      name: formData.get("name"),
      content: formData.get("content"),
    };

    await db.query(
      `INSERT INTO comments (name, content, post_id) VALUES ($1, $2, $3)`,
      [data.name, data.content, postID]
    );

    revalidatePath(`/post/${postID}`);
  }
  return (
    <>
      <form
        action={handleSaveComment}
        className="pt-3 pl-4 pr-4 pb-3 border-t border-b border-content-border"
      >
        <fieldset className="flex flex-col">
          <CommentForm nameValue="" contentValue="" />
        </fieldset>
      </form>
    </>
  );
}
