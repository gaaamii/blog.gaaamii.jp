"use client";

import Link from "next/link";
import React, { useState } from "react";
import { Post, PostStatus } from "../../../models/post";
import { useAuthorization } from "../../../hooks/useAuthorization";
import { useFetchPostsAsAdmin } from "../../../hooks/useFetchPostsAsAdmin";
import { PostLink } from "../../../components/PostLink";
import { getLocalizedDateString } from "../../../utils/datetime";
import { Button } from "../../../components/Button";
import { destroy } from "../../../utils/api";

export default function AdminPage() {
  const { isAuthorized } = useAuthorization();

  return isAuthorized ? <PostSection /> : null;
}

const PostSection = () => {
  const { postStatus, onChangeStatus } = usePostSelect();

  return (
    <section className="mt-8 border p-8 rounded-md">
      <h2 className="text-lg font-bold">記事一覧</h2>
      <div className="flex gap-4 mt-4 items-center">
        <PostFilter value={postStatus} onChange={onChangeStatus} />
      </div>
      <div className="mt-8">
        <PostList postStatus={postStatus} />
      </div>
    </section>
  );
};

const usePostSelect = () => {
  const [postStatus, setPostStatus] = useState<PostStatus | null>("draft");
  const onChangeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "published" || e.target.value === "draft") {
      setPostStatus(e.target.value);
    } else {
      setPostStatus(null);
    }
  };

  return {
    postStatus,
    onChangeStatus,
  };
};

const PostFilter = ({
  onChange,
  value,
}: {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: PostStatus | null;
}) => {
  return (
    <>
      <label htmlFor="post-select">公開状態</label>
      <PostSelect onChange={onChange} value={value} />
    </>
  );
};

const PostSelect = ({
  onChange,
  value,
}: {
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  value: PostStatus | null;
}) => {
  return (
    <select
      id="post-select"
      className="border border-slate-500 h-8 w-40 rounded"
      onChange={onChange}
      value={value ?? "all"}
    >
      <option value="all">すべて</option>
      <option value="draft">下書き</option>
      <option value="published">公開済み</option>
    </select>
  );
};

const PostList = ({ postStatus }: { postStatus: PostStatus | null }) => {
  const { isLoading, posts, refetch } = useFetchPostsAsAdmin(postStatus);

  if (isLoading) {
    return <p className="text-center bg-neutral-200 py-2">読込中...</p>;
  }

  return (
    posts && (
      <div>
        {posts.map((post) => (
          <PostItem post={post} key={post.id} onDelete={refetch} />
        ))}
      </div>
    )
  );
};

const usePostItem = ({
  post,
  onDelete,
}: {
  post: Post;
  onDelete: () => void;
}) => {
  const [isDeleting, setIsDeleting] = React.useState(false);
  const deletePost = async () => {
    setIsDeleting(true);
    const response = await destroy(`/posts/${post.id}`);
    if (response.ok) {
      alert("削除しました");
      setIsDeleting(false);
      onDelete();
    } else {
      alert("エラーが発生しました");
      setIsDeleting(false);
    }
  };

  return { deletePost, isDeleting };
};

const PostItem = ({ post, onDelete }: { post: Post; onDelete: () => void }) => {
  const { isDeleting, deletePost } = usePostItem({ post, onDelete });

  return (
    <div className="mt-0 sm:mt-4 relative list-none lg:flex items-center gap-1">
      <time className="inline-block text-sm">
        {getLocalizedDateString(post.published_at)}
      </time>
      <PostLink post={post} href={`/admin/posts/${post.id}`} />
      <div className="flex gap-4">
        <Link href={`/posts/${post.id}/edit`}>
          <span className="underline cursor-pointer">編集する</span>
        </Link>
        <Button onClick={deletePost} disabled={isDeleting} theme="text">
          削除する
        </Button>
      </div>
    </div>
  );
};
