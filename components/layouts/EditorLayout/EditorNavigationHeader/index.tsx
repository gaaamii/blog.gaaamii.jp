import Link from "next/link";
import React from "react";

export const EditorNavigationHeader = () => (
  <header>
    <nav className="w-full px-8 pt-4 underline">
      <Link
        href="/admin"
        prefetch={false}
        className="hover:bg-neutral-200 dark:hover:bg-neutral-600 py-2 px-2 rounded"
      >
        ◀ 管理画面に戻る
      </Link>
    </nav>
  </header>
);
