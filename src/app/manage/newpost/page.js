import { db } from "@/utils/dbconnection";
import { redirect } from "next/navigation";

export default async function NewPostPage() {
  const cats = (await db.query(`SELECT * FROM categories`)).rows;

  async function handleNewPost(formData) {
    "use server";

    const data = {
      auth: formData.get("auth"),
      title: formData.get("title"),
      content: formData.get("content"),
      category: parseInt(formData.get("category")),
    };

    if (data.auth === process.env.NEXT_AUTH) {
      await db.query(
        `INSERT INTO posts (title, content, category_id) VALUES ($1, $2, $3)`,
        [data.title, data.content, data.category]
      );
    } else {
      redirect("/manage");
    }

    redirect("/posts");
  }

  return (
    <div className="flex flex-col justify-self-center pt-2 gap-2 w-sm md:w-md lg:w-lg xl:w-xl bg-content-panel md:rounded-md mt-10">
      <form
        action={handleNewPost}
        className=" pl-4 pr-4 pb-3 border-b border-content-border"
      >
        <fieldset className="flex flex-col">
          <label htmlFor="auth" className="text-lg">
            Are you me?
          </label>
          <input type="password" name="auth" className="border mb-5"></input>

          <span>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              id="title"
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
            placeholder="required"
            required
            className="bg-form-input rounded-sm mb-2 p-1"
          />
          <select
            name="category"
            id="category"
            className="bg-form-input mb-5 p-1"
            required
          >
            <option hidden>Select...</option>
            {cats.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="border border-sky-500 active:bg-sky-600"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}
