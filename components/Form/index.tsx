import { useState, useCallback, useEffect } from "react";
import { Button } from "../Button/index";
import {
  getISODateString,
  getFullTimeString,
  getTimeString,
} from "../../utils/datetime";
import type { PostStatus as PostStatusType } from "../../models/post";
import { PostStatus } from "./PostStatus";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { ImageForm } from "./ImageForm";
import Link from "next/link";

export type Value = {
  title: string;
  body: string;
  publishedAt: Date | null;
  status: PostStatusType;
};

type ReturnBySubmit = {
  isSuccess: boolean;
};
type Props = {
  onSubmit: (value: Value) => Promise<ReturnBySubmit>;
  postId?: number;
  value?: Value;
};

export const Form = (props: Props) => {
  const form = useForm(props);

  return (
    <form onSubmit={form.onSubmit}>
      <div className="flex items-center">
        <label
          htmlFor="title"
          className="w-24 block text-gray-600 dark:text-gray-400"
        >
          タイトル
        </label>
        <Input
          id="title"
          onChange={form.handleTitleChange}
          className="p-2 w-full border rounded-sm"
          value={form.values.title}
        />
      </div>

      <div className="flex items-start mt-2">
        <label
          htmlFor="body"
          className="w-24 block text-gray-600 dark:text-gray-400"
        >
          本文
        </label>
        <div className="w-full">
          <Textarea
            id="body"
            onChange={form.handleBodyChange}
            className="p-2 w-full border rounded-sm"
            rows={16}
            value={form.values.body}
          />
          <ImageForm />
        </div>
      </div>

      <div className="mt-8 flex gap-4 items-center justify-end text-gray-700 dark:text-gray-300">
        <div>公開状態:</div>
        <PostStatus status={form.values.status} />
        <label htmlFor="publishedAt">
          公開{form.values.status === "draft" ? "予定" : ""}日時:
        </label>
        <div>
          <Input
            id="publishedAtDate"
            value={
              form.values.publishedAt
                ? getISODateString(form.values.publishedAt) ?? ""
                : ""
            }
            className="border p-1 rounded-md mt-1"
            onChange={form.handlePublishedAtDateChange}
            type="date"
            aria-label="公開日"
          />
          <Input
            id="publishedAtTime"
            value={
              form.values.publishedAt
                ? getTimeString(form.values.publishedAt)
                : ""
            }
            className="ml-2 border p-1 rounded-md"
            onChange={form.handlePublishedAtTimeChange}
            type="time"
            aria-label="公開時刻"
          />
        </div>
      </div>

      <ControlPanel postId={props.postId} form={form} />
    </form>
  );
};

const ControlPanel = ({ postId, form }: { postId?: number; form }) => {
  return (
    <div className="shadow-xl rounded-lg gap-4 m-auto fixed bottom-4 flex justify-center px-16 py-2 right-10 border border-gray-400 bg-white">
      {postId && <PreviewLink postId={postId} />}
      <Button
        theme="secondary"
        size="sm"
        type="button"
        disabled={form.isSubmitting}
        onClick={form.handleDraftSave}
      >
        下書き保存
      </Button>
      <Button
        theme="primary"
        size="sm"
        type="submit"
        disabled={form.isSubmitting}
      >
        公開する
      </Button>
    </div>
  );
};

const useForm = (props: Props) => {
  const [title, setTitle] = useState<string>(props.value?.title || "");
  const [body, setBody] = useState<string>(props.value?.body || "");
  const [publishedAt, setPublishedAt] = useState<Date>(
    props.value?.publishedAt || new Date(),
  );
  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const handlePublishedAtDateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newDateString = e.target.value;
      const newDate = new Date(
        `${newDateString} ${getFullTimeString(publishedAt)}`,
      );
      setPublishedAt(newDate);
    },
    [publishedAt],
  );

  const handlePublishedAtTimeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTimeString = e.target.value;
      const newDate = new Date(
        `${getISODateString(publishedAt)} ${newTimeString}:00`,
      );
      setPublishedAt(newDate);
    },
    [publishedAt],
  );

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [],
  );

  const handleBodyChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setBody(e.target.value);
    },
    [],
  );

  const handleDraftSave = async (e: any) => {
    e.preventDefault();
    setSubmitting(false);
    const result = await props.onSubmit({
      publishedAt,
      title,
      body,
      status: "draft",
    });
    alert("記事を保存しました");
  };

  const resetForm = useCallback(() => {
    setTitle("");
    setBody("");
    setPublishedAt(new Date());
  }, []);

  const onSubmit = useCallback(
    async (e: any) => {
      e.preventDefault();
      setSubmitting(true);
      const result = await props.onSubmit({
        publishedAt,
        title,
        body,
        status: "published",
      });
      if (result.isSuccess) {
        alert("記事を作成しました");
      } else {
        alert("記事を作成できませんでした");
      }
      setSubmitting(false);
      resetForm();
    },
    [props.onSubmit, title, body, publishedAt],
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (props.value?.status === "draft") {
        setPublishedAt(new Date());
      }
    }, 30000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return {
    onSubmit,
    handleBodyChange,
    handleDraftSave,
    handlePublishedAtDateChange,
    handlePublishedAtTimeChange,
    handleTitleChange,
    isSubmitting,
    values: {
      title,
      body,
      publishedAt,
      status: props.value?.status || "draft",
    },
  };
};

const PreviewLink = ({ postId }: { postId: number }) => {
  return (
    <Link
      href={`/admin/posts/${postId}`}
      className="inline-block bg-white rounded-lg p-2 border"
      target="_blank"
    >
      プレビュー
    </Link>
  );
};
