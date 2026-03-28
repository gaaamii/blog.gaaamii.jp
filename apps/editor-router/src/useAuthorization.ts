import { useEffect, useState } from "react";

type AuthState = {
  isAuthorized: boolean;
  isLoading: boolean;
};

export const useAuthorization = (): AuthState => {
  const [state, setState] = useState<AuthState>({
    isAuthorized: false,
    isLoading: true,
  });

  useEffect(() => {
    fetch("/api/mock/user_sessions/ping", {
      credentials: "include",
    })
      .then((response) => {
        setState({ isAuthorized: response.ok, isLoading: false });
      })
      .catch(() => {
        setState({ isAuthorized: false, isLoading: false });
      });
  }, []);

  return state;
};
