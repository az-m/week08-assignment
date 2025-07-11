import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/utils/dbconnection";
import CommentForm from "./CommentForm";
import Link from "next/link";

export default function EditComment({
  postID,
  commentID,
  nameValue,
  contentValue,
}) {
  async function handleSaveComment(formData) {
    "use server";

    const data = {
      name: formData.get("name"),
      content: formData.get("content"),
    };

    await db.query(
      `UPDATE comments SET name = $1, content = $2 WHERE id = $3`,
      [data.name, data.content, commentID]
    );

    revalidatePath(`/post/${postID}`);
    redirect(`/post/${postID}`);
  }

  return (
    <>
      <form
        action={handleSaveComment}
        className="pt-3 pl-4 pr-4 pb-3 border-b border-content-border"
      >
        <fieldset className="flex flex-col pt-5 border-t border-content-border">
          <legend className="text-sm ml-5 mr-5 pl-2 pr-2">
            Update comment
          </legend>
          <CommentForm nameValue={nameValue} contentValue={contentValue} />
        </fieldset>
      </form>
      <p className="p-4">
        <Link
          href={`/post/${postID}`}
          className="text-link-reverse hover:text-link-hover-reverse"
        >
          Back to post
        </Link>
      </p>
    </>
  );
}
