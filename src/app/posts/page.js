import PostList from "@/components/PostList";

export default async function Posts({ searchParams }) {
  const queryStr = await searchParams;
  let sortOrder = queryStr.sort;
  if (!sortOrder) {
    sortOrder = "asc";
  }

  return (
    <>
      <h2>Posts</h2>
      <PostList sortOrder={sortOrder} />
    </>
  );
}
