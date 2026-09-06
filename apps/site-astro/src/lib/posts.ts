import type { Post } from "@gaaamii/domain/post";
import { fetchPost, fetchPosts } from "./content-api";

export const getPublishedPosts = async (): Promise<Post[]> => {
  const posts = await fetchPosts();
  return posts.filter((post) => post.status === "published");
};

export const getPublishedPost = async (id: number): Promise<Post> => {
  const post = await fetchPost(id);

  if (post.status !== "published") {
    throw new Error(`Published post not found: ${id}`);
  }

  return post;
};
