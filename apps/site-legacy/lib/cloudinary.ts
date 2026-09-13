export type CloudinaryResponseJson = {
  secure_url: string;
};

export const postImageToCloudinary = async (_file: File): Promise<Response> => {
  throw new Error("Cloudinary upload is only available in the editor app");
};
