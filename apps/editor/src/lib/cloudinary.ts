import { api } from "./api";
import {
  type CloudinaryResponseJson,
  type CloudinarySignData,
  uploadImageToCloudinary,
} from "@gaaamii/editor-shared/cloudinary";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME;

export const postImageToCloudinary = async (
  file: File,
): Promise<CloudinaryResponseJson> => {
  return uploadImageToCloudinary({
    file,
    cloudName,
    getCloudinarySignData: async () => {
      const signDataResponse = await api.get("/cloudinary_signature");
      if (!signDataResponse.ok) {
        const message = await signDataResponse.text();
        throw new Error(message || "Failed to get Cloudinary signature");
      }

      return (await signDataResponse.json()) as CloudinarySignData;
    },
  });
};
