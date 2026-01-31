import { Post } from "../../models/post";

const base: Post = {
  id: 1,
  title: "タイトル",
  body: "本文",
  published_at: new Date().toISOString(),
  status: "published",
};
export function buildPost(data?: Partial<Post>) {
  return { ...base, ...data };
}

export function buildPosts() {
  return [
    buildPost({
      id: 1,
      title: "短めタイトル",
      published_at: new Date("2025-01-01").toISOString(),
    }),
    buildPost({
      id: 2,
      title:
        "長いタイトル。タイトルにしてはとても長くて改行もするかもしれない。たぶん改行する",
      published_at: new Date("2025-02-26").toISOString(),
    }),
    buildPost({
      id: 3,
      title: "This is a title written in English",
      published_at: new Date("2025-04-03").toISOString(),
    }),
    buildPost({
      id: 4,
      title: "漢字が多用された堅苦しい印象の記事見出し",
      published_at: new Date("2025-07-15").toISOString(),
    }),
    buildPost({
      id: 5,
      title: "やさしいかんじのタイトル",
      published_at: new Date("2025-12-31").toISOString(),
    }),
  ];
}
