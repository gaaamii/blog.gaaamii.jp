import type { Post } from "@gaaamii/domain/post";
import { fetchPost, fetchPosts } from "./content-api";

let publishedPostsPromise: Promise<Post[]> | undefined;

export const getPublishedPosts = () => {
  publishedPostsPromise ??= fetchPosts().then((posts) =>
    posts.filter((post) => post.status === "published"),
  );
  return publishedPostsPromise;
};

export const getPublishedPost = async (id: number): Promise<Post> => {
  const post = await fetchPost(id);

  if (post.status !== "published") {
    throw new Error(`Published post not found: ${id}`);
  }

  return post;
};
