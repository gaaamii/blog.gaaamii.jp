import { useEffect } from "react";

export const useBlockNavigation = () => {
  const blockNavigation = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", blockNavigation);

    return () => {
      window.removeEventListener("beforeunload", blockNavigation);
    };
  }, []);
};
