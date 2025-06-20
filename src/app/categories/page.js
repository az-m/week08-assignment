import Link from "next/link";
import { db } from "@/utils/dbconnection";

export default async function Categories() {
  const cats = (await db.query(`SELECT * FROM categories`)).rows;
  return (
    <div className="flex flex-col justify-self-center mt-5 w-sm md:w-md lg:w-lg xl:w-xl bg-content-panel md:rounded-md">
      <ul className="mt-5 p-5">
        {cats.map((cat) => (
          <li
            key={cat.id}
            className="border-b border-content-border pt-1 pb-1 md:text-lg last-of-type:border-none"
          >
            <Link href={`/posts?cat=${cat.id}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
