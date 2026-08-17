import { PostForm } from "../components/PostForm";
import { PostFormToolbar } from "../components/PostFormToolbar";
import { useBlockNavigation } from "../hooks/useBlockNavigation";
import { usePostFormState, type PostFormValue } from "../hooks/usePostFormState";
import { api } from "../lib/api";

export const PostNewPage = () => {
  useBlockNavigation();

  const formId = "post-create-form";

  const handleSubmit = async (value: PostFormValue) => {
    const response = await api.post("/posts", {
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

  const form = usePostFormState({
    onSubmit: handleSubmit,
    mode: "create",
  });

  return (
    <>
      <PostFormToolbar
        formId={formId}
        status={form.status}
        publishedAt={form.publishedAt}
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
  );
};
