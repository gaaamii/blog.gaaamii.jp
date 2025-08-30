import { NextApiRequest, NextApiResponse } from "next";
import { buildPost } from "../../../../mocks/data/post";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      res.status(200).json(buildPost(req.body.post));
      return;
    case "DELETE":
      res.status(204).json({});
      return;
  }

  throw new Error("mock server does not support this req");
};
