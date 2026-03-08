import { useEffect, useState } from "react";
import { Post } from "@gaaamii/domain/post";
import { contentApi } from "../lib/api";

export const useFetchPostAsAdmin = ({ postId }: { postId?: string }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!postId) {
      return;
    }

    setIsLoading(true);
    setError(null);

    contentApi.get(`/admin/posts/${postId}`)
      .then((res) => {
        if (res.ok) {
          res.json().then((json: Post) => {
            setPost(json);
            setIsLoading(false);
          });
          return;
        }

        setIsLoading(false);
      })
      .catch((nextError) => {
        setError(nextError as Error);
        setIsLoading(false);
      });
  }, [postId]);

  return { isLoading, post, error };
};
