import AdminPostClient from "./post-client";

export default async function AdminPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <AdminPostClient postId={id} />;
}
