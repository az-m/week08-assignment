import { redirect } from "next/navigation";
import { db } from "@/utils/dbconnection";

export default async function UpdatePostPage({ params }) {
  const slug = await params;

  const post = (
    await db.query(`SELECT posts.title FROM posts WHERE posts.id = $1`, [
      slug.id,
    ])
  ).rows[0];

  async function handleDelete(formData) {
    "use server";

    const auth = formData.get("auth");

    if (auth === process.env.NEXT_AUTH) {
      await db.query(`DELETE FROM posts WHERE posts.id = $1`, [slug.id]);
    } else {
      redirect("/manage");
    }
    redirect(`/posts`);
  }

  return (
    <div className="flex flex-col justify-self-center items-center mt-10">
      <p className="text-2xl">{post.title}</p>
      <form
        action={handleDelete}
        className="p-4 border-b border-content-border"
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
          <button
            type="submit"
            className="border border-red-500 bg-red-950 active:bg-red-600"
          >
            Delete
          </button>
        </fieldset>
      </form>
    </div>
  );
}
