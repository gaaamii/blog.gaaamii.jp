import { useEffect, useState } from "react";
import type { Post, PostStatus } from "@gaaamii/domain/post";
import { api } from "../lib/api";

type UseAdminPostsResult = {
  posts: Post[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

export const useAdminPosts = (
  postStatus: PostStatus | null,
): UseAdminPostsResult => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const basePath = "/admin/posts";
      const path = postStatus ? `${basePath}?status=${postStatus}` : basePath;
      const response = await api.get(path);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const json = (await response.json()) as Post[];
      setPosts(json);
    } catch (nextError) {
      setError(nextError as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchPosts();
  }, [postStatus]);

  return { posts, isLoading, error, refetch: fetchPosts };
};
