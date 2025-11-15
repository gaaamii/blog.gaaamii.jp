import type { Metadata } from "next";
import NewPostClient from "./new-client";

export const metadata: Metadata = {
  title: "記事を作成する",
};

export default function NewPostPage() {
  return <NewPostClient />;
}
