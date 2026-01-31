import { NextApiRequest, NextApiResponse } from "next";
import { buildPost, buildPosts } from "../../../mocks/data/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.status(200).json(buildPosts());
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
