import { useState, useEffect } from 'react';
import { Post, PostStatus } from '../models/post';
import { get } from '../utils/api';

export const useFetchPosts = (postStatus: PostStatus | null) => {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const isFetched = posts !== null

  useEffect(
    () => {
      setPosts(null)
      setIsLoading(true)
    },
    [postStatus]
  )

  if (!isFetched) {
    const basePath = '/admin/posts'
    const path = postStatus ? `${basePath}?status=${postStatus}` : basePath

    get(path).then((res: Response) => {
      if (res.ok) {
        res.json().then((json: Post[]) => {
          setPosts(json)
          setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })
  }

  return { posts, isLoading }
}