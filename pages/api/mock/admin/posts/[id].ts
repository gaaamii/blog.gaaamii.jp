import { NextApiRequest, NextApiResponse } from "next";
import { buildPost } from "../../../../../mocks/data/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    res.status(200).json(buildPost(req.body.post));
    return;
  }

  throw new Error("mock server does not support this req");
};
