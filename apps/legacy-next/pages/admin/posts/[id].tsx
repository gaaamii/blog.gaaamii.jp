import { Article } from "../../../components/feature/Article";
import { useFetchPostAsAdmin } from "../../../hooks/useFetchPostAsAdmin";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuthorization } from "../../../hooks/useAuthorization";
import { MarkdownCompiledOnClient } from "../../../components/feature/Markdown";
import MainLayout from "../../../components/feature/MainLayout";

export default function AdminPostPage() {
  const { isAuthorized, isLoading, pageTitle, post } = useAdminPost();

  if (!isLoading && !isAuthorized) {
    return "Not Found";
  }

  return (
    <MainLayout>
      <>
        {isLoading ? (
          <div>読み込み中...</div>
        ) : (
          <Article post={post}>
            <MarkdownCompiledOnClient>{post.body}</MarkdownCompiledOnClient>
          </Article>
        )}
      </>
    </MainLayout>
  );
}

const useAdminPost = () => {
  const { id } = useRouter().query as { id: string };
  const { post, isLoading } = useFetchPostAsAdmin({ postId: id });
  const [pageTitle, setPageTitle] = useState<string>("gaaamiiのブログ");
  const { isAuthorized } = useAuthorization();

  useEffect(() => {
    if (post) {
      setPageTitle(`(下書き) ${post.title} - gaaamiiのブログ`);
    }
  }, [post?.id]);

  return {
    isAuthorized,
    isLoading,
    pageTitle,
    post,
  };
};
