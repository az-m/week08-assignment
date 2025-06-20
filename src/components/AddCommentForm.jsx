import { revalidatePath } from "next/cache";
import { db } from "@/utils/dbconnection";

export default function AddCommentForm({ postID }) {
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

    revalidatePath(`post/${postID}`);
  }
  return (
    <>
      <form
        action={handleSaveComment}
        className="pt-3 pl-4 pr-4 pb-3 border-t border-b border-content-border"
      >
        <fieldset className="flex flex-col">
          <span>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="required"
              required
              className="bg-form-input rounded-sm ml-2 p-1"
            />
          </span>
          <label htmlFor="content">Your comment:</label>
          <textarea
            name="content"
            id="content"
            rows="4"
            placeholder="required"
            required
            className="bg-form-input rounded-sm mb-2 p-1"
          />
          <button
            type="submit"
            className="border border-sky-500 active:bg-sky-600"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </>
  );
}
