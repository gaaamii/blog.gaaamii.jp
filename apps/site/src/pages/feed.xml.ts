import type { APIRoute } from "astro";
import { getISODateString } from "@gaaamii/utils/datetime";
import { getPublishedPosts } from "../lib/posts";

export const GET: APIRoute = () => {
  const posts = getPublishedPosts();
  const items = posts
    .map(
      (post) => `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>https://blog.gaaamii.jp/posts/${post.id}</link>
        <guid>https://blog.gaaamii.jp/posts/${post.id}</guid>
        <pubDate>${getISODateString(post.published_at)}</pubDate>
      </item>`,
    )
    .join("");

  const body = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>blog.gaaamii.jp</title>
    <link>https://blog.gaaamii.jp</link>
    <description>blog feed</description>${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
};
