import { useEffect, useRef, useState } from "react";
import type { PostStatus } from "@gaaamii/domain/post";

export type PostFormValue = {
  title: string;
  body: string;
  publishedAt: Date;
  status: PostStatus;
};

export const usePostFormState = ({
  onSubmit,
  initialValue,
  mode,
}: {
  onSubmit: (value: PostFormValue) => Promise<{ isSuccess: boolean }>;
  initialValue?: PostFormValue | null;
  mode: "create" | "edit";
}) => {
  const [title, setTitle] = useState(initialValue?.title ?? "");
  const [body, setBody] = useState(initialValue?.body ?? "");
  const [publishedAt, setPublishedAt] = useState(
    initialValue?.publishedAt ?? new Date(),
  );
  const [status, setStatus] = useState<PostStatus>(
    initialValue?.status ?? "draft",
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastSyncedInitialValueRef = useRef<string | null>(null);

  const initialValueKey = initialValue
    ? JSON.stringify({
        title: initialValue.title,
        body: initialValue.body,
        publishedAt:
          initialValue.publishedAt instanceof Date
            ? initialValue.publishedAt.toISOString()
            : null,
        status: initialValue.status,
      })
    : null;

  useEffect(() => {
    if (!initialValue) {
      return;
    }

    if (lastSyncedInitialValueRef.current === initialValueKey) {
      return;
    }

    setTitle(initialValue.title);
    setBody(initialValue.body);
    setPublishedAt(initialValue.publishedAt);
    setStatus(initialValue.status);
    lastSyncedInitialValueRef.current = initialValueKey;
  }, [initialValue, initialValueKey]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPublishedAt((current) => {
        if (status !== "draft") {
          return current;
        }

        return new Date();
      });
    }, 30000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [status]);

  const resetForm = () => {
    setTitle("");
    setBody("");
    setPublishedAt(new Date());
    setStatus("draft");
  };

  const handleDraftSave = async () => {
    setIsSubmitting(true);

    try {
      const result = await onSubmit({
        title,
        body,
        publishedAt,
        status: "draft",
      });

      if (result.isSuccess) {
        setStatus("draft");
        alert(mode === "edit" ? "記事を更新しました" : "記事を保存しました");
      } else {
        alert(
          mode === "edit"
            ? "記事を更新できませんでした"
            : "記事を保存できませんでした",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePublish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await onSubmit({
        title,
        body,
        publishedAt,
        status: "published",
      });

      if (result.isSuccess) {
        setStatus("published");
        alert(mode === "edit" ? "記事を更新しました" : "記事を作成しました");
        if (mode === "create") {
          resetForm();
        }
      } else {
        alert(
          mode === "edit"
            ? "記事を更新できませんでした"
            : "記事を作成できませんでした",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    title,
    setTitle,
    body,
    setBody,
    publishedAt,
    setPublishedAt,
    status,
    isSubmitting,
    handleDraftSave,
    handlePublish,
  };
};
