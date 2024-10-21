import { Post } from "../../models/post";

const postMock: Post = {
  id: 1,
  title: "タイトル",
  body: "本文",
  published_at: new Date().toISOString(),
  status: "published",
};

export function buildPost(data?: Partial<Post>) {
  return { ...postMock, data };
}
