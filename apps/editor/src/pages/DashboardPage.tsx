import { useState } from "react";
import type { Post, PostStatus } from "@gaaamii/domain/post";
import { Box } from "@gaaamii/ui/Box";
import { Cluster } from "@gaaamii/ui/Cluster";
import { Stack } from "@gaaamii/ui/Stack";
import { getLocalizedDateString } from "@gaaamii/utils/datetime";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../lib/api";
import { useAdminPosts } from "../hooks/useAdminPosts";

export const DashboardPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const rawStatus = searchParams.get("status");
  const postStatus =
    rawStatus === "draft" || rawStatus === "published" ? rawStatus : null;

  const { posts, isLoading, error, refetch } = useAdminPosts(postStatus);

  return (
    <section className="rounded-[20px] border border-[rgba(17,24,39,0.08)] bg-white p-6">
      <Cluster justify="between" align="end" className="mb-6">
        <div>
          <h2 className="m-0 text-2xl">記事一覧</h2>
          <p className="mt-2 text-gray-500">
            記事の管理と公開状態の変更ができます。
          </p>
        </div>
        <Link to="/posts/new" className={buttonLinkClassName}>
          新規投稿
        </Link>
      </Cluster>

      <Stack
        as="label"
        htmlFor="post-status"
        space="2"
        className="mb-5 font-semibold"
      >
        <span>公開状態</span>
        <select
          id="post-status"
          className="h-10 min-w-[180px] rounded-xl border border-[rgba(17,24,39,0.16)] bg-white px-3"
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
      </Stack>

      {isLoading ? <StatusPanel>読込中...</StatusPanel> : null}
      {!isLoading && error ? (
        <StatusPanel tone="error">
          記事一覧の取得に失敗しました。`yarn dev:editor-mock-api`
          を確認してください。
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
    <Box
      padding="4"
      borderWidth="1"
      radius="2xl"
      className={
        tone === "error"
          ? "border-red-200 bg-red-50 text-red-800"
          : "border-gray-200 bg-gray-100 text-gray-700"
      }
    >
      {children}
    </Box>
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
    <Stack space="3">
      {posts.map((post) => (
        <PostListItem key={post.id} post={post} onDelete={onDelete} />
      ))}
    </Stack>
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
    <Box
      as="article"
      borderWidth="1"
      radius="2xl"
      className="border-[rgba(17,24,39,0.08)] bg-white p-[18px]"
    >
      <Cluster justify="between" align="start" className="gap-3">
        <Stack className="gap-2.5">
          <Cluster align="center" space="2">
            <time className="text-sm text-gray-500">
              {getLocalizedDateString(post.published_at)}
            </time>
            <StatusBadge status={post.status} />
          </Cluster>
          <Link
            to={`/posts/${post.id}`}
            className="text-lg leading-6 font-bold no-underline"
          >
            {post.title}
          </Link>
        </Stack>

        <Cluster space="2.5">
          <Link to={`/posts/${post.id}/edit`} className={buttonLinkClassName}>
            編集する
          </Link>
          <button
            type="button"
            className={`${buttonLinkClassName} bg-red-50 text-red-800`}
            onClick={() => {
              void handleDelete();
            }}
            disabled={isDeleting}
          >
            {isDeleting ? "削除中..." : "削除する"}
          </button>
        </Cluster>
      </Cluster>
    </Box>
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
    <Box
      as="span"
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${
        status === "published"
          ? "bg-green-100 text-green-800"
          : "bg-violet-100 text-violet-800"
      }`}
    >
      {status === "published" ? "公開済み" : "下書き"}
    </Box>
  );
};

const buttonLinkClassName =
  "cursor-pointer rounded-xl border border-[rgba(17,24,39,0.12)] bg-white px-[14px] py-2.5 font-semibold text-gray-900 no-underline disabled:cursor-not-allowed";
