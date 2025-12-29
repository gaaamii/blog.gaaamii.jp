import { useState, useCallback, useEffect } from "react";
import { Button } from "../../ui/Button";
import { Cluster } from "../../ui/Cluster";
import { Stack } from "../../ui/Stack";
import {
  getISODateString,
  getFullTimeString,
  getTimeString,
} from "../../../utils/datetime";
import type { PostStatus as PostStatusType } from "../../../models/post";
import { PostStatus } from "./PostStatus";
import { Input } from "./Input";
import { Textarea } from "./Textarea";
import { ImageForm } from "./ImageForm";
import Link from "next/link";
import { Center } from "../../ui/Center";

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
      <ControlPanel postId={props.postId} form={form} />
      <Center maxWidth="prose">
        <Cluster space="2" align="center">
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
        </Cluster>

        <Cluster space="2" align="start" className="mt-2">
          <label
            htmlFor="body"
            className="w-24 block text-gray-600 dark:text-gray-400"
          >
            本文
          </label>
          <Stack space="2" className="w-full">
            <Textarea
              id="body"
              onChange={form.handleBodyChange}
              className="p-2 w-full border rounded-sm"
              rows={16}
              value={form.values.body}
            />
            <ImageForm />
          </Stack>
        </Cluster>
      </Center>
    </form>
  );
};

const ControlPanel = ({ postId, form }: { postId?: number; form }) => {
  return (
    <div className="inset-x-0 top-0 z-50 w-full shadow px-4 py-3 text-gray-700 shadow-sm backdrop-blur dark:border-neutral-700 dark:bg-neutral-900/95 dark:text-gray-300">
      <Stack space="3">
        <Cluster space="3" align="center" justify="between">
          <Link
            href="/admin"
            prefetch={false}
            className="w-fit rounded px-2 py-2 text-sm font-medium underline hover:bg-neutral-200 dark:hover:bg-neutral-600"
          >
            ◀ 管理画面に戻る
          </Link>

          <Cluster space="3" align="center" justify="end">
            <PostStatus status={form.values.status} />
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
          </Cluster>
        </Cluster>

        <Cluster
          align="center"
          justify="end"
          className="gap-x-6 gap-y-2 md:pl-2"
        >
          <Cluster space="2" align="center" justify="end">
            <label
              htmlFor="publishedAtDate"
              className="whitespace-nowrap text-sm font-medium"
            >
              公開{form.values.status === "draft" ? "予定" : ""}日時
            </label>
            <Cluster space="2" align="center" justify="end">
              <Input
                id="publishedAtDate"
                value={getISODateString(form.values.publishedAt)}
                className="rounded-md border border-gray-300 bg-white p-1 text-sm dark:border-neutral-700 dark:bg-neutral-950"
                onChange={form.handlePublishedAtDateChange}
                type="date"
                aria-label="公開日"
              />
              <Input
                id="publishedAtTime"
                value={getTimeString(form.values.publishedAt)}
                className="rounded-md border border-gray-300 bg-white p-1 text-sm dark:border-neutral-700 dark:bg-neutral-950"
                onChange={form.handlePublishedAtTimeChange}
                type="time"
                aria-label="公開時刻"
              />
            </Cluster>
          </Cluster>
        </Cluster>
      </Stack>
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
    <Button
      as="a"
      href={`/admin/posts/${postId}`}
      theme="secondary"
      size="sm"
      target="_blank"
      rel="noreferrer"
    >
      プレビュー
    </Button>
  );
};
