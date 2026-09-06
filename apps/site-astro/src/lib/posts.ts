import {
  fetchPost,
  fetchPosts,
  type PostDetail,
  type PostSummary,
} from "./content-api";

export const getPosts = (): Promise<PostSummary[]> => fetchPosts();

export const getPost = (id: number): Promise<PostDetail> => fetchPost(id);
