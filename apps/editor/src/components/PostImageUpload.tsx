import { useState } from "react";
import { Box } from "@gaaamii/ui/Box";
import { Cluster } from "@gaaamii/ui/Cluster";
import { Stack } from "@gaaamii/ui/Stack";
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
    <Box
      as="details"
      borderWidth="1"
      radius="2xl"
      className="mt-3 border-[rgba(17,24,39,0.12)] bg-white"
    >
      <summary className="cursor-pointer px-4 py-[14px] font-bold text-gray-700">
        画像アップロード
      </summary>

      <Stack space="3" className="px-4 pb-4">
        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            setFile(event.target.files?.[0] ?? null);
          }}
        />

        <Cluster space="2.5">
          <button
            type="button"
            onClick={() => {
              void handleUpload();
            }}
            disabled={isUploading || !file}
            className={secondaryButtonClassName}
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
                className={secondaryButtonClassName}
              >
                URL をコピー
              </button>
              <button
                type="button"
                onClick={() => {
                  onInsertMarkdown(`\n![](${url})\n`);
                }}
                className={secondaryButtonClassName}
              >
                本文に追記
              </button>
            </>
          ) : null}
        </Cluster>

        {error ? (
          <p className="m-0 leading-[1.6] text-red-800">{error}</p>
        ) : null}

        {url ? (
          <Box
            borderWidth="1"
            radius="2xl"
            className="border-[rgba(17,24,39,0.08)] bg-gray-50 p-3"
          >
            <Stack space="2.5">
              <img
                src={url}
                alt="Uploaded preview"
                className="max-h-80 max-w-full rounded-xl bg-white object-contain"
              />
              <p className="m-0 overflow-wrap-anywhere text-[13px] text-gray-600 [overflow-wrap:anywhere]">
                画像URL: {url}
              </p>
            </Stack>
          </Box>
        ) : (
          <p className="m-0 text-sm text-gray-500">
            Cloudinary 設定がある場合、ここから画像 URL を生成できます。
          </p>
        )}
      </Stack>
    </Box>
  );
};

const secondaryButtonClassName =
  "cursor-pointer rounded-xl border border-[rgba(17,24,39,0.12)] bg-gray-100 px-[14px] py-2.5 font-semibold disabled:cursor-not-allowed";
