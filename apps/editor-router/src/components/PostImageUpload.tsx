import { useState } from "react";
import { postImageToCloudinary } from "../lib/cloudinary";

export const PostImageUpload = ({
  onInsertMarkdown,
}: {
  onInsertMarkdown: (markdown: string) => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async () => {
    if (!file) {
      alert("ファイルを指定してください");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const uploaded = await postImageToCloudinary(file);
      setUrl(uploaded.secure_url);
    } catch (nextError) {
      setError(nextError instanceof Error ? nextError.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopy = async () => {
    if (!url) {
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      alert("画像URLをコピーしました");
    } catch {
      alert("画像URLのコピーに失敗しました");
    }
  };

  return (
    <details
      style={{
        marginTop: "12px",
        borderRadius: "14px",
        border: "1px solid rgba(17, 24, 39, 0.12)",
        backgroundColor: "#fff",
      }}
    >
      <summary
        style={{
          cursor: "pointer",
          padding: "14px 16px",
          fontWeight: 700,
          color: "#374151",
        }}
      >
        画像アップロード
      </summary>

      <div style={{ padding: "0 16px 16px", display: "grid", gap: "12px" }}>
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
          }}
        />

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            type="button"
            onClick={() => {
              void handleUpload();
            }}
            disabled={isUploading || !file}
            style={secondaryButtonStyle}
          >
            {isUploading ? "アップロード中..." : "アップロードする"}
          </button>

          {url ? (
            <>
              <button
                type="button"
                onClick={() => {
                  void handleCopy();
                }}
                style={secondaryButtonStyle}
              >
                URL をコピー
              </button>
              <button
                type="button"
                onClick={() => {
                  onInsertMarkdown(`\n![](${url})\n`);
                }}
                style={secondaryButtonStyle}
              >
                本文に追記
              </button>
            </>
          ) : null}
        </div>

        {error ? (
          <p style={{ margin: 0, color: "#991b1b", lineHeight: 1.6 }}>{error}</p>
        ) : null}

        {url ? (
          <div
            style={{
              display: "grid",
              gap: "10px",
              padding: "12px",
              borderRadius: "14px",
              border: "1px solid rgba(17, 24, 39, 0.08)",
              backgroundColor: "#f9fafb",
            }}
          >
            <img
              src={url}
              alt="Uploaded preview"
              style={{
                maxWidth: "100%",
                maxHeight: "320px",
                objectFit: "contain",
                borderRadius: "12px",
                backgroundColor: "#fff",
              }}
            />
            <p
              style={{
                margin: 0,
                fontSize: "13px",
                color: "#4b5563",
                overflowWrap: "anywhere",
              }}
            >
              画像URL: {url}
            </p>
          </div>
        ) : (
          <p style={{ margin: 0, color: "#6b7280", fontSize: "14px" }}>
            Cloudinary 設定がある場合、ここから画像 URL を生成できます。
          </p>
        )}
      </div>
    </details>
  );
};

const secondaryButtonStyle = {
  padding: "10px 14px",
  borderRadius: "12px",
  border: "1px solid rgba(17, 24, 39, 0.12)",
  backgroundColor: "#f3f4f6",
  cursor: "pointer",
  fontWeight: 600,
};
