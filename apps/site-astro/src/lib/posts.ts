import type { Post } from "@gaaamii/domain/post";
import { ContentApiClient, ContentApiNotFoundError } from "./content-api";

export class PublishedPostNotFoundError extends Error {
  constructor(readonly id: number) {
    super(`Published post not found: ${id}`);
    this.name = new.target.name;
  }
}

export class PostRepository {
  constructor(private readonly client = new ContentApiClient()) {}

  async getPublishedPosts(): Promise<Post[]> {
    const posts = await this.client.getPosts();
    return posts.filter((post) => post.status === "published");
  }

  async getPublishedPost(id: number): Promise<Post> {
    let post: Post;

    try {
      post = await this.client.getPost(id);
    } catch (error) {
      if (error instanceof ContentApiNotFoundError) {
        throw new PublishedPostNotFoundError(id);
      }
      throw error;
    }

    if (post.status !== "published") {
      throw new PublishedPostNotFoundError(id);
    }

    return post;
  }
}

const repository = new PostRepository();
let publishedPostsPromise: Promise<Post[]> | undefined;

export const getPublishedPosts = () => {
  publishedPostsPromise ??= repository.getPublishedPosts();
  return publishedPostsPromise;
};

export const getPublishedPost = (id: number) => repository.getPublishedPost(id);
