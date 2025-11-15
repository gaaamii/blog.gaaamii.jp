import type { ReactNode } from "react";
import MainLayout from "../../components/layouts/MainLayout";

export default function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <MainLayout>{children}</MainLayout>;
}
