import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/utils/dbconnection";

export default async function UpdatePostPage({ params }) {
  const slug = await params;

  const post = (
    await db.query(
      `SELECT posts.title, posts.content, category_id, categories.name AS category FROM posts JOIN categories ON category_id = categories.id WHERE posts.id = $1`,
      [slug.id]
    )
  ).rows[0];
  const cats = (await db.query(`SELECT * FROM categories`)).rows;

  async function handlePostUpdate(formData) {
    "use server";

    const data = {
      auth: formData.get("auth"),
      title: formData.get("title"),
      content: formData.get("content"),
      category: parseInt(formData.get("category")),
    };

    if (data.auth === process.env.NEXT_AUTH) {
      await db.query(
        `UPDATE posts SET title = $1, content = $2, category_id = $3 WHERE id = $4`,
        [data.title, data.content, data.category, slug.id]
      );
      revalidatePath(`/post/${slug.id}`);
    } else {
      redirect("/manage");
    }

    redirect(`/post/${slug.id}`);
  }

  return (
    <div className="flex flex-col justify-self-center pt-2 gap-2 w-sm md:w-md lg:w-lg xl:w-xl bg-content-panel md:rounded-md mt-10">
      <form
        action={handlePostUpdate}
        className="pl-4 pr-4 pb-3 border-b border-content-border"
      >
        <fieldset className="flex flex-col">
          <label htmlFor="auth" className="text-lg">
            Are you me?
          </label>
          <input
            type="password"
            name="auth"
            className="border mb-5 pl-1"
          ></input>

          <span>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={post.title}
              placeholder="required"
              required
              className="bg-form-input rounded-sm ml-2 p-1"
            />
          </span>
          <label htmlFor="content" className="mt-2">
            Content:
          </label>
          <textarea
            name="content"
            id="content"
            rows="10"
            defaultValue={post.content}
            placeholder="required"
            required
            className="bg-form-input rounded-sm mb-2 p-1"
          />
          <select
            name="category"
            id="category"
            defaultValue={post.category_id}
            className="bg-form-input mb-5 p-1"
            required
          >
            {cats.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="border border-sky-500 active:bg-sky-600 hover:bg-sky-200 dark:hover:bg-sky-800"
          >
            Update
          </button>
        </fieldset>
      </form>
    </div>
  );
}
