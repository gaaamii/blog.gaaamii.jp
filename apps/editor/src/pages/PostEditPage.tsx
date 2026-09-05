import { useMemo } from "react";
import { PostForm } from "../components/PostForm";
import { PostFormToolbar } from "../components/PostFormToolbar";
import { useAdminPost } from "../hooks/useAdminPost";
import { useBlockNavigation } from "../hooks/useBlockNavigation";
import { usePostFormState, type PostFormValue } from "../hooks/usePostFormState";
import { api } from "../lib/api";
import { useParams } from "react-router-dom";

export const PostEditPage = () => {
  const { id } = useParams();
  const { post, isLoading, error } = useAdminPost(id);
  const formId = "post-edit-form";

  useBlockNavigation();

  const handleSubmit = async (value: PostFormValue) => {
    if (!post) {
      return { isSuccess: false };
    }

    const response = await api.put(`/posts/${post.id}`, {
      post: {
        title: value.title,
        body: value.body,
        published_at: value.publishedAt.toISOString(),
        status: value.status,
      },
    });

    return {
      isSuccess: response.ok,
    };
  };

  const initialValue = useMemo(
    () =>
      post
        ? {
            title: post.title,
            body: post.body,
            publishedAt: new Date(post.published_at),
            status: post.status,
          }
        : null,
    [post],
  );

  const form = usePostFormState({
    onSubmit: handleSubmit,
    initialValue,
    mode: "edit",
  });

  return (
    <>
      {isLoading ? <p>読込中...</p> : null}
      {!isLoading && error ? (
        <p>記事の取得に失敗しました。`yarn dev:editor-mock-api` を確認してください。</p>
      ) : null}
      {!isLoading && !error && initialValue && post ? (
        <>
          <PostFormToolbar
            formId={formId}
            status={form.status}
            publishedAt={form.publishedAt}
            previewPostId={post.id}
            isSubmitting={form.isSubmitting}
            onDraftSave={() => {
              void form.handleDraftSave();
            }}
            onPublishedAtChange={form.setPublishedAt}
          />
          <PostForm
            formId={formId}
            title={form.title}
            body={form.body}
            onSubmit={form.handlePublish}
            onTitleChange={form.setTitle}
            onBodyChange={form.setBody}
          />
        </>
      ) : null}
    </>
  );
};
