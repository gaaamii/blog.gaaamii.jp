"use client";

import { Article } from "../../../../components/Article";
import MainLayout from "../../../../components/layouts/MainLayout";
import { MarkdownCompiledOnClient } from "../../../../components/Markdown/client";
import { useFetchPostAsAdmin } from "../../../../hooks/useFetchPostAsAdmin";
import { useAuthorization } from "../../../../hooks/useAuthorization";

export default function AdminPostClient({ postId }: { postId: string }) {
  const { isAuthorized, isLoading, post } = useAdminPost(postId);

  if (!isLoading && !isAuthorized) {
    return <div>Not Found</div>;
  }

  return (
    <MainLayout>
      <>
        {isLoading ? (
          <div>読み込み中...</div>
        ) : (
          post && (
            <Article post={post}>
              <MarkdownCompiledOnClient>{post.body}</MarkdownCompiledOnClient>
            </Article>
          )
        )}
      </>
    </MainLayout>
  );
}

const useAdminPost = (postId: string) => {
  const { post, isLoading } = useFetchPostAsAdmin({ postId });
  const { isAuthorized } = useAuthorization();

  return {
    isAuthorized,
    isLoading,
    post,
  };
};
