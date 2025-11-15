import RSS from "rss";
import { SITE_INFO } from "../../config/settings";
import { get } from "../../utils/api";
import { Post } from "../../models/post";

export async function GET() {
  const posts = await fetchPosts();
  const feed = await generateFeed(posts);

  return new Response(feed.xml(), {
    headers: { "Content-Type": "application/rss+xml;charset=utf-8" },
  });
}

const fetchPosts = async (): Promise<Post[]> => {
  const response = await get(`/posts`);
  if (response.ok) {
    return (await response.json()) as Post[];
  }

  return [];
};

const addItemToFeed = (feed: RSS, post: Post) => {
  feed.item({
    title: post.title,
    description: post.body,
    url: `${SITE_INFO.rootUrl}/posts/${post.id}`,
    author: SITE_INFO.author,
    date: post.published_at,
  });
};

const generateFeed = async (posts: Post[]) => {
  const feedOptions = {
    ...SITE_INFO,
    feed_url: `${SITE_INFO.rootUrl}/feed`,
    site_url: SITE_INFO.rootUrl,
    language: "ja",
  };
  const feed = new RSS(feedOptions);
  posts.forEach((post) => addItemToFeed(feed, post));
  return feed;
};
