import { buildPosts } from "../../mocks-post";

export const getPublishedPosts = () =>
  buildPosts().filter((post) => post.status === "published");

export const getPublishedPostById = (id: number) =>
  getPublishedPosts().find((post) => post.id === id);
