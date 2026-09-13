import { NextApiRequest, NextApiResponse } from "next";
import { buildPost } from "../../../../mocks-post";
import { applyCorsHeaders } from "../_shared";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  applyCorsHeaders(res);

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method === "GET") {
    res.status(200).json([buildPost(req.body.post)]);
    return;
  }

  if (["POST", "PUT"].includes(req.method)) {
    res.status(200).json({
      post: buildPost(req.body.post),
    });
    return;
  }

  throw new Error("mock server does not support this req");
};
