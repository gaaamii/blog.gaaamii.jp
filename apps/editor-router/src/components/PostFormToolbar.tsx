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
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        padding: "12px 20px",
        borderBottom: "1px solid rgba(17, 24, 39, 0.08)",
        backgroundColor: "rgba(255, 255, 255, 0.92)",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
            alignItems: "center",
            flexWrap: "nowrap",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              fontWeight: 600,
              color: "#374151",
            }}
          >
            ← 一覧に戻る
          </Link>

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            <label
              htmlFor="publishedAtDate"
              style={{
                whiteSpace: "nowrap",
                fontSize: "14px",
                fontWeight: 600,
              }}
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
              style={dateInputStyle}
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
              style={dateInputStyle}
            />
            <StatusBadge status={status} />
            {typeof previewPostId === "number" ? (
              <a
                href={`${siteRoot}/posts/${previewPostId}`}
                target="_blank"
                rel="noreferrer"
                style={secondaryLinkStyle}
              >
                プレビュー
              </a>
            ) : null}
            <button
              type="button"
              onClick={onDraftSave}
              disabled={isSubmitting}
              style={secondaryButtonStyle}
            >
              下書き保存
            </button>
            <button
              type="submit"
              form={formId}
              disabled={isSubmitting}
              style={primaryButtonStyle}
            >
              公開する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: PostStatus }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      padding: "6px 12px",
      borderRadius: "999px",
      backgroundColor: status === "draft" ? "#ede9fe" : "#dcfce7",
      color: status === "draft" ? "#5b21b6" : "#166534",
      fontWeight: 700,
      fontSize: "13px",
    }}
  >
    {status === "draft" ? "下書き" : "公開済み"}
  </span>
);

const dateInputStyle = {
  padding: "6px 12px",
  borderRadius: "999px",
  border: "1px solid rgba(17, 24, 39, 0.14)",
  backgroundColor: "#fff",
  fontSize: "13px",
  lineHeight: 1.2,
};

const secondaryButtonStyle = {
  padding: "6px 12px",
  borderRadius: "999px",
  border: "1px solid rgba(17, 24, 39, 0.12)",
  backgroundColor: "#f3f4f6",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "13px",
  lineHeight: 1.2,
};

const primaryButtonStyle = {
  padding: "6px 12px",
  borderRadius: "999px",
  border: "1px solid rgba(2, 132, 199, 0.2)",
  backgroundColor: "#0284c7",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 700,
  fontSize: "13px",
  lineHeight: 1.2,
};

const secondaryLinkStyle = {
  ...secondaryButtonStyle,
  color: "#111827",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
};
