import { useEffect } from "react";

export const useBlockNavigation = () => {
  useEffect(() => {
    const blockNavigation = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", blockNavigation);

    return () => {
      window.removeEventListener("beforeunload", blockNavigation);
    };
  }, []);
};
