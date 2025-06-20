import Link from "next/link";

export default function Header() {
  return (
    <header className="text-foreground-reverse flex flex-col items-center pt-5">
      <h1 className="text-2xl font-extrabold">The Title</h1>
      <nav>
        <Link href="/" className="hover:text-sky-500">
          Home
        </Link>{" "}
        |{" "}
        <Link href="/posts" className="hover:text-sky-500">
          Posts
        </Link>{" "}
        |{" "}
        <Link href="/categories" className="hover:text-sky-500">
          Categories
        </Link>{" "}
        |{" "}
        <Link href="/manage" className="hover:text-sky-500">
          Manage
        </Link>
      </nav>
    </header>
  );
}
