import { Box } from "@gaaamii/ui/Box";
import { Center } from "@gaaamii/ui/Center";
import { Cluster } from "@gaaamii/ui/Cluster";
import type { PostStatus } from "@gaaamii/domain/post";
import {
  getFullTimeString,
  getISODateString,
  getTimeString,
} from "@gaaamii/utils/datetime";
import { Link } from "react-router-dom";

const siteRoot = import.meta.env.VITE_SITE_URL || "http://localhost:3100";

export const PostFormToolbar = ({
  formId,
  status,
  publishedAt,
  previewPostId,
  isSubmitting,
  onDraftSave,
  onPublishedAtChange,
}: {
  formId: string;
  status: PostStatus;
  publishedAt: Date;
  previewPostId?: number;
  isSubmitting: boolean;
  onDraftSave: () => void;
  onPublishedAtChange: (value: Date) => void;
}) => {
  return (
    <Box
      className="fixed inset-x-0 top-0 z-30 border-b border-[rgba(17,24,39,0.08)] bg-white/92 px-5 py-3"
    >
      <Center maxWidth="none" className="max-w-[1440px]">
        <Cluster
          justify="between"
          align="center"
          className="gap-4 flex-nowrap"
        >
          <Link
            to="/"
            className="font-semibold text-gray-700 no-underline"
          >
            ← 一覧に戻る
          </Link>

          <Cluster
            align="center"
            className="gap-3 flex-nowrap"
          >
            <label
              htmlFor="publishedAtDate"
              className="whitespace-nowrap text-sm font-semibold"
            >
              公開{status === "draft" ? "予定" : ""}日時
            </label>
            <input
              id="publishedAtDate"
              type="date"
              aria-label="公開日"
              value={getISODateString(publishedAt) ?? ""}
              onChange={(event) => {
                const nextDate = new Date(
                  `${event.target.value} ${getFullTimeString(publishedAt)}`,
                );
                onPublishedAtChange(nextDate);
              }}
              className={dateInputClassName}
            />
            <input
              id="publishedAtTime"
              type="time"
              aria-label="公開時刻"
              value={getTimeString(publishedAt)}
              onChange={(event) => {
                const nextDate = new Date(
                  `${getISODateString(publishedAt) ?? ""} ${event.target.value}:00`,
                );
                onPublishedAtChange(nextDate);
              }}
              className={dateInputClassName}
            />
            <StatusBadge status={status} />
            {typeof previewPostId === "number" ? (
              <a
                href={`${siteRoot}/posts/${previewPostId}`}
                target="_blank"
                rel="noreferrer"
                className={secondaryActionClassName}
              >
                プレビュー
              </a>
            ) : null}
            <button
              type="button"
              onClick={onDraftSave}
              disabled={isSubmitting}
              className={secondaryActionClassName}
            >
              下書き保存
            </button>
            <button
              type="submit"
              form={formId}
              disabled={isSubmitting}
              className={primaryActionClassName}
            >
              公開する
            </button>
          </Cluster>
        </Cluster>
      </Center>
    </Box>
  );
};

const StatusBadge = ({ status }: { status: PostStatus }) => (
  <Box
    as="span"
    className={`inline-flex items-center rounded-full px-3 py-1.5 text-[13px] font-bold ${
      status === "draft"
        ? "bg-violet-100 text-violet-800"
        : "bg-green-100 text-green-800"
    }`}
  >
    {status === "draft" ? "下書き" : "公開済み"}
  </Box>
);

const dateInputClassName =
  "rounded-full border border-[rgba(17,24,39,0.14)] bg-white px-3 py-1.5 text-[13px] leading-[1.2]";

const secondaryActionClassName =
  "inline-flex cursor-pointer items-center rounded-full border border-[rgba(17,24,39,0.12)] bg-gray-100 px-3 py-1.5 text-[13px] leading-[1.2] font-bold text-gray-900 no-underline transition-colors disabled:cursor-not-allowed";

const primaryActionClassName =
  "cursor-pointer rounded-full border border-sky-600/20 bg-sky-600 px-3 py-1.5 text-[13px] leading-[1.2] font-bold text-white transition-colors disabled:cursor-not-allowed";
