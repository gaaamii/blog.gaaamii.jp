import { cache } from "react";
import { Post } from "../models/post";
import { get } from "../utils/api";

export const POSTS_REVALIDATE_SECONDS = 60 * 60;

export const fetchPosts = cache(async (): Promise<Post[]> => {
  const response = await get("/posts", {
    next: { revalidate: POSTS_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    return [];
  }

  return (await response.json()) as Post[];
});

export const fetchPostById = cache(async (postId: string) => {
  if (!postId) {
    return null;
  }

  const response = await get(`/posts/${postId}`, {
    next: { revalidate: POSTS_REVALIDATE_SECONDS },
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${postId}`);
  }

  return (await response.json()) as Post;
});

export const fetchStaticPostParams = cache(async () => {
  const posts = await fetchPosts();
  return posts.map((post) => ({ id: post.id.toString() }));
});
