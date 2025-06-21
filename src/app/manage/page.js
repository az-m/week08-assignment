import { redirect } from "next/navigation";
import { db } from "@/utils/dbconnection";
import Link from "next/link";

export default async function Manage() {
  async function manageUpdateForm(formData) {
    "use server";
    const selected = parseInt(formData.get("post"));
    redirect(`/manage/update/${selected}`);
  }
  async function manageDeleteForm(formData) {
    "use server";
    const selected = parseInt(formData.get("post"));
    redirect(`/manage/delete/${selected}`);
  }

  const data = (
    await db.query(`SELECT posts.id, posts.title FROM posts ORDER BY title ASC`)
  ).rows;
  return (
    <div className="flex flex-col justify-self-center">
      <div className="flex flex-col items-center pt-10 text-lg w-sm md:w-md lg:w-lg xl:w-xl gap-2 text-foreground-reverse">
        <Link
          href="/manage/newpost"
          className="text-sky-300 hover:text-sky-500"
        >
          New
        </Link>
        <p className="mt-4">Update:</p>
        <form
          className="p-4 border-t border-b border-content-border"
          action={manageUpdateForm}
        >
          <fieldset>
            <select
              name="post"
              id="post"
              className="bg-form-input p-1 max-w-50 text-foreground"
              required
            >
              <option hidden>Select a post...</option>
              {data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="border border-sky-500 active:bg-sky-600 hover:bg-sky-800 ml-4 p-2"
            >
              Submit
            </button>
          </fieldset>
        </form>
        <p className="mt-4">Delete:</p>
        <form
          className="p-4 border-t border-b border-content-border"
          action={manageDeleteForm}
        >
          <fieldset>
            <select
              name="post"
              id="post"
              className="bg-form-input p-1 max-w-50 text-foreground"
              required
            >
              <option hidden>Select a post...</option>
              {data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="border border-sky-500 active:bg-sky-600 hover:bg-sky-800 ml-4 p-2"
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
