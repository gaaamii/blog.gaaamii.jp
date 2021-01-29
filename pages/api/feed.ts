const RSS = require("rss");
import { SITE_INFO } from "../../config/settings";
import { get } from "../../utils/api";
import { Post } from "../../models/post";

export default async (req, res) => {
  res.statusCode = 200;
  const posts = await fetchPosts();
  const feed = await generateFeed(posts);
  res.setHeader("Content-Type", "application/rss+xml;charset=utf-8");
  res.write(feed.xml());
  res.end();
};

const fetchPosts = async () => {
  const res = await get(`/posts`);
  if (res.ok) {
    const posts = await res.json();
    return posts;
  }
};

const addItemToFeed = (feed: any, post: Post) => {
  feed.item({
    title: post.title,
    description: post.body,
    url: `${SITE_INFO.rootUrl}/${post.id}`,
    author: SITE_INFO.author,
    date: post.published_at,
  });
};

const generateFeed = async (posts: Post[]) => {
  const feedOptions = {
    ...SITE_INFO,
    feed_url: "https://blog.gaaamii.jp/feed",
    site_url: "https://blog.gaaamii.jp",
    language: "ja",
  };
  const feed = new RSS(feedOptions);
  posts.forEach((post) => addItemToFeed(feed, post));
  return feed;
};
