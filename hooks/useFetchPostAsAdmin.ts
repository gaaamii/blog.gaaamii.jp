import { useState } from 'react';
import { Post } from '../models/post';
import { get } from '../utils/api';

export const useFetchPostAsAdmin = ({ postId }: { postId?: string; }) => {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const isFetched = post !== null

  if (!isFetched && postId) {
    get(`/admin/posts/${postId}`).then(res => {
      if (res.ok) {
        res.json().then((json: Post) => {
          setPost(json)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
  }

  return { isLoading, post }
}