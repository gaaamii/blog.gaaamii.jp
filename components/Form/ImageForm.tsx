import { Button } from "../Button/index";
import { useState } from "react";
import {
  CloudinaryResponseJson,
  postImageToCloudinary,
} from "../../utils/cloudinary";
import { PhotoIcon } from "../icons/Photo";
import { ArrowUpTrayIcon } from "../icons/ArrowUpTray";

export const ImageForm = () => {
  const { isUploading, url, file, onUpload, onSelectFile } = useFileUploader();

  return (
    <div className="rounded-sm border">
      <details>
        <summary className="p-2 hover:bg-slate-200 flex gap-2 items-center cursor-pointer text-gray-800 dark:text-gray-400 text-sm">
          <PhotoIcon />
          <span className="font-bold">画像アップロード</span>
        </summary>
        <div className="p-4">
          <div className="mt-4">
            <input
              type="file"
              className="border w-full"
              onChange={onSelectFile}
            />
          </div>
          <div className="flex justify-end mt-4">
            <Button
              type="button"
              onClick={onUpload}
              disabled={isUploading || !file}
              size="sm"
              theme="secondary"
            >
              <div className="flex items-center gap-2">
                <ArrowUpTrayIcon />
                <span>アップロードする</span>
              </div>
            </Button>
          </div>
          <div className="mt-2">
            {url && (
              <div className="mt-4 p-2 border flex justify-center bg-neutral-100">
                <img src={url} className="border-l border-r" />
              </div>
            )}
            {url && <div className="text-right">画像URL: {url}</div>}
          </div>
        </div>
      </details>
    </div>
  );
};

const useFileUploader = () => {
  const [isUploading, setUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  const onUpload = async () => {
    if (!file) {
      alert("ファイルを指定してください");
      return;
    }

    setUploading(true);

    const response = await postImageToCloudinary(file);

    setUploading(false);
    if (response.ok) {
      const json = (await response.json()) as CloudinaryResponseJson;

      setUrl(json.secure_url);
    }
  };

  const onSelectFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  return { file, onUpload, onSelectFile, isUploading, url };
};
