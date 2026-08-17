import { useState } from "react";
import type { Post, PostStatus } from "@gaaamii/domain/post";
import { getLocalizedDateString } from "@gaaamii/utils/datetime";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../lib/api";
import { useAdminPosts } from "../hooks/useAdminPosts";

const filterSelectStyle = {
  height: "40px",
  minWidth: "180px",
  padding: "0 12px",
  borderRadius: "12px",
  border: "1px solid rgba(17, 24, 39, 0.16)",
  backgroundColor: "#fff",
};

const buttonStyle = {
  padding: "10px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(17, 24, 39, 0.12)",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  textDecoration: "none",
  color: "#111827",
  fontWeight: 600,
};

const sectionStyle = {
  padding: "24px",
  border: "1px solid rgba(17, 24, 39, 0.08)",
  borderRadius: "20px",
  backgroundColor: "rgba(255, 255, 255, 0.86)",
  boxShadow: "0 20px 60px rgba(17, 24, 39, 0.08)",
};

export const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawStatus = searchParams.get("status");
  const postStatus =
    rawStatus === "draft" || rawStatus === "published"
      ? rawStatus
      : null;

  const { posts, isLoading, error, refetch } = useAdminPosts(postStatus);

  return (
    <section style={sectionStyle}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
          gap: "16px",
          flexWrap: "wrap",
          marginBottom: "24px",
        }}
      >
        <div>
          <h2 style={{ margin: 0, fontSize: "24px" }}>記事一覧</h2>
          <p style={{ margin: "8px 0 0", color: "#6b7280" }}>
            `apps/editor` の一覧画面を React Router 側へ移植中です。
          </p>
        </div>
        <Link to="/posts/new" style={buttonStyle}>
          新規投稿
        </Link>
      </div>

      <label
        htmlFor="post-status"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginBottom: "20px",
          fontWeight: 600,
        }}
      >
        <span>公開状態</span>
        <select
          id="post-status"
          style={filterSelectStyle}
          value={postStatus ?? "all"}
          onChange={(event) => {
            const nextStatus = event.target.value;
            const nextParams = new URLSearchParams(searchParams);

            if (nextStatus === "draft" || nextStatus === "published") {
              nextParams.set("status", nextStatus);
            } else {
              nextParams.delete("status");
            }

            setSearchParams(nextParams);
          }}
        >
          <option value="all">すべて</option>
          <option value="draft">下書き</option>
          <option value="published">公開済み</option>
        </select>
      </label>

      {isLoading ? <StatusPanel>読込中...</StatusPanel> : null}
      {!isLoading && error ? (
        <StatusPanel tone="error">
          記事一覧の取得に失敗しました。`yarn dev:editor-mock-api` を確認してください。
        </StatusPanel>
      ) : null}
      {!isLoading && !error ? (
        <PostList posts={posts} onDelete={refetch} />
      ) : null}
    </section>
  );
};

const StatusPanel = ({
  children,
  tone = "neutral",
}: {
  children: string;
  tone?: "neutral" | "error";
}) => {
  const palette =
    tone === "error"
      ? {
          backgroundColor: "#fef2f2",
          color: "#991b1b",
          borderColor: "#fecaca",
        }
      : {
          backgroundColor: "#f3f4f6",
          color: "#374151",
          borderColor: "#e5e7eb",
        };

  return (
    <div
      style={{
        padding: "16px",
        borderRadius: "16px",
        border: `1px solid ${palette.borderColor}`,
        backgroundColor: palette.backgroundColor,
        color: palette.color,
      }}
    >
      {children}
    </div>
  );
};

const PostList = ({
  posts,
  onDelete,
}: {
  posts: Post[];
  onDelete: () => Promise<void>;
}) => {
  if (posts.length === 0) {
    return <StatusPanel>該当する記事がありません。</StatusPanel>;
  }

  return (
    <div style={{ display: "grid", gap: "12px" }}>
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} onDelete={onDelete} />
      ))}
    </div>
  );
};

const PostListItem = ({
  post,
  onDelete,
}: {
  post: Post;
  onDelete: () => Promise<void>;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const response = await api.destroy(`/posts/${post.id}`);

      if (!response.ok) {
        alert("エラーが発生しました");
        return;
      }

      alert("削除しました");
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <article
      style={{
        display: "grid",
        gap: "12px",
        padding: "18px",
        borderRadius: "16px",
        border: "1px solid rgba(17, 24, 39, 0.08)",
        backgroundColor: "#fff",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "space-between",
          alignItems: "start",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "grid", gap: "10px" }}>
          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
            <time style={{ fontSize: "14px", color: "#6b7280" }}>
              {getLocalizedDateString(post.published_at)}
            </time>
            <StatusBadge status={post.status} />
          </div>
          <Link
            to={`/posts/${post.id}`}
            style={{
              fontWeight: 700,
              fontSize: "18px",
              lineHeight: 1.5,
              textDecoration: "none",
            }}
          >
            {post.title}
          </Link>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <Link to={`/posts/${post.id}/edit`} style={buttonStyle}>
            編集する
          </Link>
          <button
            type="button"
            style={{
              ...buttonStyle,
              color: "#991b1b",
              backgroundColor: "#fef2f2",
            }}
            onClick={() => {
              void handleDelete();
            }}
            disabled={isDeleting}
          >
            {isDeleting ? "削除中..." : "削除する"}
          </button>
        </div>
      </div>
    </article>
  );
};

const StatusBadge = ({ status }: { status: PostStatus }) => {
  const palette =
    status === "published"
      ? {
          backgroundColor: "#dcfce7",
          color: "#166534",
        }
      : {
          backgroundColor: "#ede9fe",
          color: "#5b21b6",
        };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "4px 10px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: 700,
        backgroundColor: palette.backgroundColor,
        color: palette.color,
      }}
    >
      {status === "published" ? "公開済み" : "下書き"}
    </span>
  );
};
