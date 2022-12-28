import Head from 'next/head'
import Main from '../../../components/Main/index';
import { Post } from '../../../models/post';
import { get, put } from '../../../utils/api';
import { useCallback, useState } from 'react';
import { Value, Form } from '../../../components/Form/index';
import { useBlockNavigation } from '../../../hooks/useBlockNavigation';
import { NavigationHeader } from '../../../components/NavigationHeader/index';
import { useAuthorization } from '../../../hooks/useAuthorization';
import { useRouter } from 'next/router';

export default function EditPage() {
  const { isAuthorized } = useAuthorization()
  const { id } = useRouter().query as { id?: string; }
  const { post, isLoading } = useFetchPost({ postId: id });
  const { initialValues, onSubmit } = useEditForm({ post })

  useBlockNavigation()

  return (
    <>
      <Head>
        <title>記事を編集する - gaaamiiのブログ</title>
      </Head>

      <NavigationHeader />
      <Main>
        {isLoading && <div>読込中...</div>}
        {isAuthorized && !isLoading ? <Form onSubmit={onSubmit} value={initialValues} /> : null}
      </Main>
    </>
  )
}

type UseEditFormProps = {
  post?: Post | null;
}
const useEditForm = ({ post }: UseEditFormProps) => {
  const initialValues = post ? ({
    title: post.title,
    body: post.body,
    publishedAt: post.published_at ? new Date(post.published_at) : null,
    status: post.status
  }) : null

  const onSubmit = useCallback(async (value: Value) => {
    if (!post) {
      return { isSuccess: false}
    }

    const res = await put(`/posts/${post.id}`, toParams(value))
    return {
      isSuccess: res.ok,
    }
  }, [post])

  return {
    initialValues,
    onSubmit,
  }
}
const toParams = (value: Value) => ({
  post: {
    title: value.title,
    body: value.body,
    published_at: value.publishedAt.toISOString(),
    status: value.status,
  }
})

const useFetchPost = ({ postId }: { postId?: string; }) => {
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
