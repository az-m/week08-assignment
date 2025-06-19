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
      <form action={handleSaveComment}>
        <fieldset>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="required"
            required
          />
          <label htmlFor="content">Your comment:</label>
          <textarea
            name="content"
            id="content"
            placeholder="required"
            required
          />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  );
}
