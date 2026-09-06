import type { Post } from "@gaaamii/domain/post";
import { fetchPost, fetchPosts } from "./content-api";

export const getPosts = (): Promise<Post[]> => fetchPosts();

export const getPost = (id: number): Promise<Post> => fetchPost(id);
