import Head from "next/head";
import { Post } from "../../../models/post";
import { put } from "../../../utils/api";
import { useCallback } from "react";
import { Value, Form } from "../../../components/Form/index";
import { useBlockNavigation } from "../../../hooks/useBlockNavigation";
import { useAuthorization } from "../../../hooks/useAuthorization";
import { useRouter } from "next/router";
import { useFetchPostAsAdmin } from "../../../hooks/useFetchPostAsAdmin";
import Link from "next/link";
import MainLayout from "../../../components/layouts/MainLayout";

export default function EditPage() {
  const { isAuthorized } = useAuthorization();
  const { id } = useRouter().query as { id?: string };
  const { post, isLoading } = useFetchPostAsAdmin({ postId: id });
  const { initialValues, onSubmit } = useEditForm({ post });

  useBlockNavigation();

  return (
    <MainLayout>
      <Head>
        <title>記事を編集する - gaaamiiのブログ</title>
      </Head>

      <>
        {isLoading && <div>読込中...</div>}
        {isAuthorized && !isLoading ? (
          <Form onSubmit={onSubmit} value={initialValues} />
        ) : null}
        {post && <PreviewLink postId={post.id} />}
      </>
    </MainLayout>
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

const PreviewLink = ({ postId }: { postId: number }) => {
  return (
    <div className="fixed bottom-4 flex justify-center w-full left-0">
      <Link
        href={`/admin/posts/${postId}`}
        className="rounded-lg bg-slate-100 w-80 py-2 text-center shadow-md hover:bg-slate-200"
        target="_blank"
      >
        プレビューURL
      </Link>
    </div>
  );
};
