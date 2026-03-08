import { useState, useEffect } from "react";
import { Post, PostStatus } from "@gaaamii/domain/post";
import { api } from "../lib/api";

export const useFetchPostsAsAdmin = (postStatus: PostStatus | null) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setPosts(null);
    setIsLoading(true);
    setError(null);
  }, [postStatus]);

  const fetchPosts = async () => {
    const basePath = "/admin/posts";
    const path = postStatus ? `${basePath}?status=${postStatus}` : basePath;

    try {
      const response = await api.get(path);
      if (response.ok) {
        const json: Post[] = await response.json();
        setPosts(json);
      } else {
        alert("エラーです");
      }
    } catch (nextError) {
      setError(nextError as Error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [postStatus]);

  return { posts, isLoading, error, refetch: fetchPosts };
};
