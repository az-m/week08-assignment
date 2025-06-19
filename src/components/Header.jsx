import Link from "next/link";

export default function Header() {
  return (
    <header>
      <h1>The Title</h1>
      <nav>
        <Link href="/">Home</Link> | <Link href="/posts">Posts</Link> |{" "}
        <Link href="/categories">Categories</Link>
      </nav>
    </header>
  );
}
