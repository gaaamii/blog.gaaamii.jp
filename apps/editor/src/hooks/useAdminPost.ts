import { useEffect, useState } from "react";
import type { Post } from "@gaaamii/domain/post";
import { api } from "../lib/api";

type UseAdminPostResult = {
  post: Post | null;
  isLoading: boolean;
  error: Error | null;
};

export const useAdminPost = (postId?: string): UseAdminPostResult => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!postId) {
      setIsLoading(false);
      setPost(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    api
      .get(`/admin/posts/${postId}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const json = (await response.json()) as Post;
        setPost(json);
      })
      .catch((nextError) => {
        setError(nextError as Error);
        setPost(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [postId]);

  return { post, isLoading, error };
};
