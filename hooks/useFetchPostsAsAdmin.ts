import { useState, useEffect } from "react";
import { Post, PostStatus } from "../models/post";
import { get } from "../utils/api";

export const useFetchPostsAsAdmin = (postStatus: PostStatus | null) => {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const isFetched = posts !== null;

  useEffect(() => {
    setPosts(null);
    setIsLoading(true);
  }, [postStatus]);

  const fetch = async () => {
    const basePath = "/admin/posts";
    const path = postStatus ? `${basePath}?status=${postStatus}` : basePath;

    try {
      const response = await get(path);
      if (response.ok) {
        const json: Post[] = await response.json();
        setPosts(json);
      } else {
        alert("エラーです");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isFetched) {
    fetch();
  }

  return { posts, isLoading, refetch: fetch };
};
