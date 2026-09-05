import { Box } from "@gaaamii/ui/Box";
import { Cluster } from "@gaaamii/ui/Cluster";
import { Link, useParams } from "react-router-dom";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { PostArticle } from "../components/PostArticle";
import { useAdminPost } from "../hooks/useAdminPost";

export const PostDetailPage = () => {
  const { id } = useParams();
  const { post, isLoading, error } = useAdminPost(id);

  return (
    <section className="rounded-[20px] border border-[rgba(17,24,39,0.08)] bg-white/85 p-6">
      <Cluster justify="between" align="center" className="mb-6">
        <Link
          to="/"
          className="font-semibold text-gray-700 no-underline"
        >
          ← 記事一覧に戻る
        </Link>
        <Link
          to={`/posts/${id}/edit`}
          className="rounded-xl border border-[rgba(17,24,39,0.12)] bg-white px-[14px] py-2.5 font-semibold text-gray-900 no-underline"
        >
          この投稿を編集
        </Link>
      </Cluster>

      {isLoading ? <p>読み込み中...</p> : null}
      {!isLoading && error ? (
        <Box
          padding="4"
          borderWidth="1"
          radius="2xl"
          className="border-red-200 bg-red-50 text-red-800"
        >
          記事の取得に失敗しました。`yarn dev:editor-mock-api` を確認してください。
        </Box>
      ) : null}
      {!isLoading && !error && post ? (
        <PostArticle post={post}>
          <MarkdownRenderer>{post.body}</MarkdownRenderer>
        </PostArticle>
      ) : null}
    </section>
  );
};
