"use client";

import { useCallback } from "react";
import { Form, Value } from "../../../../../components/Form";
import { useBlockNavigation } from "../../../../../hooks/useBlockNavigation";
import { useAuthorization } from "../../../../../hooks/useAuthorization";
import { useFetchPostAsAdmin } from "../../../../../hooks/useFetchPostAsAdmin";
import { put } from "../../../../../utils/api";
import { Post } from "../../../../../models/post";

export default function EditPostClient({ postId }: { postId: string }) {
  const { isAuthorized } = useAuthorization();
  const { post, isLoading } = useFetchPostAsAdmin({ postId });
  const { initialValues, onSubmit } = useEditForm({ post });

  useBlockNavigation();

  return (
    <>
      {isLoading && <div>読込中...</div>}
      {isAuthorized && !isLoading && post ? (
        <Form onSubmit={onSubmit} value={initialValues} postId={post.id} />
      ) : null}
    </>
  );
}

type UseEditFormProps = {
  post?: Post | null;
};

const useEditForm = ({ post }: UseEditFormProps) => {
  const initialValues = post
    ? {
        title: post.title,
        body: post.body,
        publishedAt: post.published_at ? new Date(post.published_at) : null,
        status: post.status,
      }
    : undefined;

  const onSubmit = useCallback(
    async (value: Value) => {
      if (!post) {
        return { isSuccess: false };
      }

      const res = await put(`/posts/${post.id}`, toParams(value));
      return {
        isSuccess: res.ok,
      };
    },
    [post],
  );

  return {
    initialValues,
    onSubmit,
  };
};

const toParams = (value: Value) => ({
  post: {
    title: value.title,
    body: value.body,
    published_at: value.publishedAt!.toISOString(),
    status: value.status,
  },
});
