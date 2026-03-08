import { editorApi } from "./api";

type SignData = {
  signature: string;
  timestamp: string;
  api_key: string;
};

export type CloudinaryResponseJson = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: Array<unknown>;
  pages: number;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
  eager: Array<{
    transformation: string;
    width: number;
    height: number;
    url: string;
    secure_url: string;
  }>;
};

const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/image/upload`;

export const postImageToCloudinary = async (file: File): Promise<Response> => {
  const signDataResponse = await editorApi.get("/cloudinary_signature");
  const signData = (await signDataResponse.json()) as SignData;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signData.signature);
  formData.append("api_key", signData.api_key);
  formData.append("timestamp", signData.timestamp);

  return fetch(CLOUDINARY_URL, { method: "POST", body: formData });
};
