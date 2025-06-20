import Link from "next/link";

export default function Manage() {
  return (
    <div className="flex flex-col items-center pt-10 text-lg gap-2">
      <Link href="/manage/newpost">New</Link>
      <Link href="update">Update</Link>
      <Link href="">Delete</Link>
    </div>
  );
}
