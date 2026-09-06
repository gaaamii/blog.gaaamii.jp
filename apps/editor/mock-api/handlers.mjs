import crypto from "node:crypto";
import { http, HttpResponse } from "msw";

const basePost = {
  id: 1,
  title: "タイトル",
  body: "本文",
  published_at: new Date().toISOString(),
  status: "published",
};

const buildPost = (data = {}) => ({ ...basePost, ...data });

const buildPosts = () => [
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

const seedPosts = () =>
  buildPosts().map((post, index) => ({
    ...post,
    status: index % 2 === 0 ? "draft" : "published",
  }));

let posts = seedPosts();

const getNextId = () =>
  posts.reduce((maxId, post) => Math.max(maxId, post.id), 0) + 1;

const toPostPayload = async (request) => {
  const json = await request.json().catch(() => null);
  return json?.post ?? {};
};

const withTimestamp = (postPayload) => ({
  published_at: new Date().toISOString(),
  status: "draft",
  ...postPayload,
});

export const handlers = [
  http.get("/api/mock/user_sessions/ping", () => HttpResponse.json({})),

  http.get("/api/mock/posts", () =>
    HttpResponse.json(posts.filter((post) => post.status === "published")),
  ),

  http.get("/api/mock/posts/:id", ({ params }) => {
    const post = posts.find((entry) => String(entry.id) === String(params.id));
    if (!post || post.status !== "published") {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return HttpResponse.json(post);
  }),

  http.get("/api/mock/admin/posts", ({ request }) => {
    const url = new URL(request.url);
    const status = url.searchParams.get("status");

    const filteredPosts =
      status === "draft" || status === "published"
        ? posts.filter((post) => post.status === status)
        : posts;

    return HttpResponse.json(filteredPosts);
  }),

  http.get("/api/mock/admin/posts/:id", ({ params }) => {
    const post = posts.find((entry) => String(entry.id) === String(params.id));
    if (!post) {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }

    return HttpResponse.json(post);
  }),

  http.post("/api/mock/posts", async ({ request }) => {
    const nextPost = buildPost({
      id: getNextId(),
      ...withTimestamp(await toPostPayload(request)),
    });

    posts = [nextPost, ...posts];

    return HttpResponse.json({ post: nextPost });
  }),

  http.put("/api/mock/posts/:id", async ({ params, request }) => {
    const currentPost = posts.find(
      (entry) => String(entry.id) === String(params.id),
    );

    if (!currentPost) {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }

    const nextPost = {
      ...currentPost,
      ...withTimestamp(await toPostPayload(request)),
      id: currentPost.id,
    };

    posts = posts.map((entry) =>
      entry.id === currentPost.id ? nextPost : entry,
    );

    return HttpResponse.json({ post: nextPost });
  }),

  http.delete("/api/mock/posts/:id", ({ params }) => {
    const hasTarget = posts.some(
      (entry) => String(entry.id) === String(params.id),
    );

    if (!hasTarget) {
      return HttpResponse.json({ message: "Not Found" }, { status: 404 });
    }

    posts = posts.filter((entry) => String(entry.id) !== String(params.id));

    return HttpResponse.json({});
  }),

  http.get("/api/mock/cloudinary_signature", () => {
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!apiKey || !apiSecret) {
      return HttpResponse.json(
        { message: "Cloudinary env is missing" },
        { status: 500 },
      );
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signature = crypto
      .createHash("sha1")
      .update(`timestamp=${timestamp}${apiSecret}`)
      .digest("hex");

    return HttpResponse.json({
      api_key: apiKey,
      signature,
      timestamp,
    });
  }),
];
