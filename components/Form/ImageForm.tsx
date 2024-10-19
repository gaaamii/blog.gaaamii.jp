import { Button } from "../Button/index";
import { useState } from "react";
import {
  CloudinaryResponseJson,
  postImageToCloudinary,
} from "../../utils/cloudinary";

export const ImageForm = () => {
  const { isUploading, url, onUpload, onSelectFile } = useFileUploader();

  return (
    <div className="p-2 rounded-sm border">
      <details>
        <summary className="cursor-pointer">画像アップロード</summary>
        <div className="pt-2 pb-4">
          <div className="mt-2">
            <input
              type="file"
              className="border w-full"
              onChange={onSelectFile}
            />
          </div>
          <div className="flex justify-end mt-2">
            <div>
              <Button type="button" onClick={onUpload} disabled={isUploading}>
                画像をアップロードする
              </Button>
            </div>
          </div>
          <div className="mt-2">
            {url && (
              <div className="mt-4 p-2 border flex justify-center bg-neutral-100">
                <img src={url} className="border-l border-r" />
              </div>
            )}
            <div className="text-right">画像URL: {url}</div>
          </div>
        </div>
      </details>
    </div>
  );
};

const useFileUploader = () => {
  const [isUploading, setUploading] = useState<boolean>(false);
  const [file, setFile] = useState<File>(null);
  const [url, setUrl] = useState<string | null>(null);

  const onUpload = async () => {
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

  return { onUpload, onSelectFile, isUploading, url };
};
