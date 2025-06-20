import PostList from "@/components/PostList";

export default async function Posts({ searchParams }) {
  const queryStr = await searchParams;
  let sortOrder = queryStr.sort;
  let category = queryStr.cat;

  if (!sortOrder) {
    sortOrder = "asc";
  }

  if (!category) {
    category = "all";
  }
  return (
    <div>
      <PostList sortOrder={sortOrder} category={category} />
    </div>
  );
}
