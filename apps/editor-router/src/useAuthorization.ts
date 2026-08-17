import { useEffect, useState } from "react";
import { api } from "./lib/api";

type AuthState = {
  isAuthorized: boolean;
  isLoading: boolean;
  error: "mock_api_unavailable" | "unauthorized" | null;
};

export const useAuthorization = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    isAuthorized: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    api
      .get("/user_sessions/ping")
      .then((response) => {
        setState({
          isAuthorized: response.ok,
          isLoading: false,
          error: response.ok ? null : "unauthorized",
        });
      })
      .catch(() => {
        setState({
          isAuthorized: false,
          isLoading: false,
          error: "mock_api_unavailable",
        });
      });
  }, []);

  return state;
};
