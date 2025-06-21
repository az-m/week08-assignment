import Link from "next/link";

export default function Header() {
  return (
    <header className="text-foreground-reverse flex flex-col items-center pt-5">
      <h1 className="text-2xl font-extrabold">The Title</h1>
      <nav>
        <Link href="/" className="text-link hover:text-link-hover">
          Home
        </Link>{" "}
        |{" "}
        <Link href="/posts" className="text-link hover:text-link-hover">
          Posts
        </Link>{" "}
        |{" "}
        <Link href="/categories" className="text-link hover:text-link-hover">
          Categories
        </Link>{" "}
        |{" "}
        <Link href="/manage" className="text-link hover:text-link-hover">
          Manage
        </Link>
      </nav>
    </header>
  );
}
