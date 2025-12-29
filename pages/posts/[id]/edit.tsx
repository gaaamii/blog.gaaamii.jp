import Head from "next/head";
import { Post } from "../../../models/post";
import { put } from "../../../utils/api";
import { useCallback } from "react";
import { Value, Form } from "../../../components/feature/Form";
import { useBlockNavigation } from "../../../hooks/useBlockNavigation";
import { useAuthorization } from "../../../hooks/useAuthorization";
import { useRouter } from "next/router";
import { useFetchPostAsAdmin } from "../../../hooks/useFetchPostAsAdmin";
import EditorMain from "../../../components/feature/EditorMain/index.tsx";

export default function EditPage() {
  const { isAuthorized } = useAuthorization();
  const { id } = useRouter().query as { id?: string };
  const { post, isLoading } = useFetchPostAsAdmin({ postId: id });
  const { initialValues, onSubmit } = useEditForm({ post });

  useBlockNavigation();

  return (
    <EditorMain>
      <Head>
        <title>記事を編集する - gaaamiiのブログ</title>
      </Head>

      <>
        {isLoading && <div>読込中...</div>}
        {isAuthorized && !isLoading ? (
          <Form onSubmit={onSubmit} value={initialValues} postId={post.id} />
        ) : null}
      </>
    </EditorMain>
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
    : null;

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
    published_at: value.publishedAt.toISOString(),
    status: value.status,
  },
});
