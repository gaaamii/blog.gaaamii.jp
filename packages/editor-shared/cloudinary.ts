export type CloudinarySignData = {
  signature: string;
  timestamp: string;
  api_key: string;
};

export type CloudinaryResponseJson = {
  secure_url: string;
};

type GetCloudinarySignData = () => Promise<CloudinarySignData>;

export const uploadImageToCloudinary = async ({
  file,
  cloudName,
  getCloudinarySignData,
}: {
  file: File;
  cloudName?: string;
  getCloudinarySignData: GetCloudinarySignData;
}): Promise<CloudinaryResponseJson> => {
  if (!cloudName) {
    throw new Error("Cloudinary cloud name is missing");
  }

  const signData = await getCloudinarySignData();

  const formData = new FormData();
  formData.append("file", file);
  formData.append("signature", signData.signature);
  formData.append("api_key", signData.api_key);
  formData.append("timestamp", signData.timestamp);

  const uploadResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!uploadResponse.ok) {
    const message = await uploadResponse.text();
    throw new Error(message || "Cloudinary upload failed");
  }

  return (await uploadResponse.json()) as CloudinaryResponseJson;
};
