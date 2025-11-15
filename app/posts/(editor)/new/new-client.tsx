"use client";

import { useCallback, useEffect, useState } from "react";
import { Form, Value } from "../../../../components/Form";
import { useBlockNavigation } from "../../../../hooks/useBlockNavigation";
import { get, post } from "../../../../utils/api";

export default function NewPostClient() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  const fetchUserSession = useCallback(() => {
    get("/user_sessions/ping").then((res) => {
      if (res.ok) {
        setIsAuthorized(true);
      }
    });
  }, []);

  useEffect(fetchUserSession, [fetchUserSession]);

  const toParams = useCallback(
    (value: Value) => ({
      post: {
        title: value.title,
        body: value.body,
        published_at: value.publishedAt!.toISOString(),
        status: value.status,
      },
    }),
    [],
  );

  const handleSubmit = useCallback(
    async (value: Value) => {
      const res = await post("/posts", toParams(value));
      return {
        isSuccess: res.ok,
      };
    },
    [toParams],
  );

  useBlockNavigation();

  return <>{isAuthorized ? <Form onSubmit={handleSubmit} /> : null}</>;
}
