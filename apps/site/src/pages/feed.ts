import type { APIRoute } from "astro";
import { SITE_AUTHOR, SITE_DESCRIPTION, SITE_TITLE } from "../config/site";
import { getPost, getPosts } from "../lib/posts";

const escapeXml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

export const GET: APIRoute = async ({ site }) => {
  if (!site) throw new Error("SITE_URL is required to generate the RSS feed");

  const summaries = await getPosts();
  const posts = await Promise.all(summaries.map((post) => getPost(post.id)));
  const feedUrl = new URL("/feed", site).toString();

  const items = posts
    .map((post) => {
      const url = new URL(`/posts/${post.id}`, site).toString();
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <description>${escapeXml(post.body)}</description>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <author>${escapeXml(SITE_AUTHOR)}</author>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <link>${escapeXml(site.toString())}</link>
    <language>ja</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link xmlns:atom="http://www.w3.org/2005/Atom" href="${escapeXml(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
};
