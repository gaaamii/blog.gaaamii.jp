import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { get, post } from "../../utils/api";
import { Form, Value } from "../../components/Form/index";
import { useBlockNavigation } from "../../hooks/useBlockNavigation";
import MainLayout from "../../components/layouts/MainLayout";

export default function NewPage() {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);

  const fetchUserSession = useCallback(() => {
    get("/user_sessions/ping").then((res) => {
      if (res.ok) {
        setIsAuthorized(true);
      }
    });
  }, []);

  useEffect(fetchUserSession, []);

  const toParams = useCallback(
    (value: Value) => ({
      post: {
        title: value.title,
        body: value.body,
        published_at: value.publishedAt.toISOString(),
        status: value.status,
      },
    }),
    [],
  );

  const handleSubmit = useCallback(async (value: Value) => {
    const res = await post("/posts", toParams(value));
    return {
      isSuccess: res.ok,
    };
  }, []);

  useBlockNavigation();

  return (
    <MainLayout>
      <Head>
        <title>記事を作成する - gaaamiiのブログ</title>
      </Head>

      <>{isAuthorized ? <Form onSubmit={handleSubmit} /> : null}</>
    </MainLayout>
  );
}
