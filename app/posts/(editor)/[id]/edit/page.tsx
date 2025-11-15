import type { Metadata } from "next";
import EditPostClient from "./edit-client";

export const metadata: Metadata = {
  title: "記事を編集する",
};

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EditPostClient postId={id} />;
}
