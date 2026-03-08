export type PostStatus = "published" | "draft";
export type Post = {
  id: number;
  title: string;
  body: string;
  published_at: string;
  status: PostStatus;
};
