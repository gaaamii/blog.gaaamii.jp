import type { ReactNode } from "react";
import { EditorLayout } from "../../../components/layouts/EditorLayout";

export default function EditorPagesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <EditorLayout>{children}</EditorLayout>;
}
