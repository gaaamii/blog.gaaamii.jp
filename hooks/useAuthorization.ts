import { useCallback, useState, useEffect } from 'react';
import { get } from '../utils/api';

export const useAuthorization = () => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

  const fetchUserSession = useCallback(() => {
    get("/user_sessions/ping").then(res => {
      if (res.ok) {
        setIsAuthorized(true)
      }
    })
  }, [])

  useEffect(fetchUserSession, [])

  return {
    isAuthorized
  }
}