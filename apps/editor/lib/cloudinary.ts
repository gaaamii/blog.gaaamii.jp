import { api } from "./api";
import {
  type CloudinaryResponseJson,
  type CloudinarySignData,
  uploadImageToCloudinary,
} from "@gaaamii/editor-shared/cloudinary";

export const postImageToCloudinary = async (file: File): Promise<Response> => {
  const json = await uploadImageToCloudinary({
    file,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    getCloudinarySignData: async () => {
      const signDataResponse = await api.get("/cloudinary_signature");
      return (await signDataResponse.json()) as CloudinarySignData;
    },
  });

  return new Response(JSON.stringify(json), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
};
