import { useState, useCallback, useEffect } from "react";
import { Block } from "../Block";
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
  value?: Value;
};

export const Form = (props: Props) => {
  const form = useForm(props);

  return (
    <form onSubmit={form.onSubmit}>
      <div className="flex gap-2 justify-end">
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
      <Block>
        <label
          htmlFor="title"
          className="block text-gray-800 dark:text-gray-400"
        >
          タイトル
        </label>
        <Input
          id="title"
          onChange={form.handleTitleChange}
          className="p-2 w-full border rounded-sm mt-1"
          value={form.values.title}
        />
      </Block>

      <Block>
        <label
          htmlFor="body"
          className="block text-gray-800 dark:text-gray-400"
        >
          本文
        </label>
        <Textarea
          id="body"
          onChange={form.handleBodyChange}
          className="p-2 w-full border rounded-sm mt-1"
          rows={14}
          value={form.values.body}
        />
      </Block>

      <ImageForm />

      <div className="mt-8 flex gap-4 items-center justify-end text-gray-700 dark:text-gray-300">
        <div>公開状態:</div>
        <PostStatus status={form.values.status} />
        <label htmlFor="publishedAt">
          公開{form.values.status === "draft" ? "予定" : ""}日時:
        </label>
        <div>
          <Input
            id="publishedAtDate"
            value={getISODateString(form.values.publishedAt)}
            className="border p-1 rounded-md mt-1"
            onChange={form.handlePublishedAtDateChange}
            type="date"
            aria-label="公開日"
          />
          <Input
            id="publishedAtTime"
            value={getTimeString(form.values.publishedAt)}
            className="ml-2 border p-1 rounded-md"
            onChange={form.handlePublishedAtTimeChange}
            type="time"
            aria-label="公開時刻"
          />
        </div>
      </div>
    </form>
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
