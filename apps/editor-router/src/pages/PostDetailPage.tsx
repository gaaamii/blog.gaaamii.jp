import { Link, useParams } from "react-router-dom";
import { MarkdownRenderer } from "../components/MarkdownRenderer";
import { PostArticle } from "../components/PostArticle";
import { useAdminPost } from "../hooks/useAdminPost";

const sectionStyle = {
  padding: "24px",
  border: "1px solid rgba(17, 24, 39, 0.08)",
  borderRadius: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.86)",
  boxShadow: "0 20px 60px rgba(17, 24, 39, 0.08)",
};

export const PostDetailPage = () => {
  const { id } = useParams();
  const { post, isLoading, error } = useAdminPost(id);

  return (
    <section style={sectionStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            fontWeight: 600,
            color: "#374151",
          }}
        >
          ← 記事一覧に戻る
        </Link>
        <Link
          to={`/posts/${id}/edit`}
          style={{
            padding: "10px 14px",
            borderRadius: "12px",
            border: "1px solid rgba(17, 24, 39, 0.12)",
            backgroundColor: "#ffffff",
            cursor: "pointer",
            textDecoration: "none",
            color: "#111827",
            fontWeight: 600,
          }}
        >
          この投稿を編集
        </Link>
      </div>

      {isLoading ? <p>読み込み中...</p> : null}
      {!isLoading && error ? (
        <p>記事の取得に失敗しました。`yarn dev:editor-mock-api` を確認してください。</p>
      ) : null}
      {!isLoading && !error && post ? (
        <PostArticle post={post}>
          <MarkdownRenderer>{post.body}</MarkdownRenderer>
        </PostArticle>
      ) : null}
    </section>
  );
};
