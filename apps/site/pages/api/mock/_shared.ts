import type { NextApiResponse } from "next";

const editorOrigin =
  process.env.NEXT_PUBLIC_EDITOR_URL || "http://localhost:3001";

export const applyCorsHeaders = (res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", editorOrigin);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
};
