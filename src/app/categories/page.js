import Link from "next/link";
import { db } from "@/utils/dbconnection";

export default async function Categories() {
  const cats = (await db.query(`SELECT * FROM categories`)).rows;
  return (
    <>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>
            <Link href={`/posts?cat=${cat.id}`}>{cat.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
