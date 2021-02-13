import { GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Main from '../../../components/Main/index';
import { Post } from '../../../models/post';
import Header from '../../../components/Header/index';
import { get, put } from '../../../utils/api';
import { useCallback, useState, useEffect } from 'react';
import { Value, Form } from '../../../components/Form/index';
import { Favicons } from '../../../components/Favicons';

type Props = {
  post?: Post | null;
}

export default function EditPage(props: Props) {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

  const fetchUserSession = useCallback(() => {
    get("/user_sessions/ping").then(res => {
      if (res.ok) {
        setIsAuthorized(true)
      }
    })
  }, [])

  useEffect(fetchUserSession, [])

  const toParams = useCallback((value: Value) => ({
    post: {
      title: value.title,
      body: value.body,
      published_at: value.publishedAt.toISOString()
    }
  }), [])

  const toValues = useCallback((post: Post) => ({
    title: props.post.title,
    body: props.post.body,
    publishedAt: new Date(props.post.published_at)
  }), [])

  const handleSubmit = useCallback(async (value: Value) => {
    const res = await put(`/posts/${props.post.id}`, toParams(value))
    return {
      isSuccess: res.ok,
    }
  }, [])

  if (!props.post) {
    return null
  }

  return (
    <>
      <Head>
        <title>記事を編集する - gaaamiiのブログ</title>
        <Favicons />
      </Head>

      <Header />
      <Main>
        {isAuthorized ? <Form onSubmit={handleSubmit} value={toValues(props.post)} /> : null}
      </Main>
    </>
  )
}

type Query = {
  id: string;
}
export async function getServerSideProps(context: GetServerSidePropsContext<Query>) {
  const res = await get(`/posts/${context.params.id}`)
  const post = res.ok ? await res.json() : null

  return {
    props: {
      post,
    },
  }
}
