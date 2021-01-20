import Head from 'next/head'
import Main from '../../components/Main/index';
import Header from '../../components/Header/index';
import { useCallback, useEffect, useState } from 'react';
import { get, post } from '../../utils/api';
import { Form, Value } from '../../components/Form/index';

export default function NewPage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

  const fetchUserSession = useCallback(() => {
    get("/user_sessions/ping").then(res => {
      if (res.ok) {
        setIsAuthorized(true)
      }
    })
  }, [])

  useEffect(fetchUserSession, [])

  const handleSubmit = useCallback(async (value: Value) => {
    const res = await post("/posts", value)
    return {
      isSuccess: res.ok,
    }
  }, [])

  return (
    <>
      <Head>
        <title>記事を作成する - gaaamiiのブログ</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Main>
        {isAuthorized ? <Form onSubmit={handleSubmit} /> : null}
      </Main>
    </>
  )
}
