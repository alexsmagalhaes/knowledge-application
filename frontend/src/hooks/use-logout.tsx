import { useSessionStore } from "@/store/use-session.store";
import Cookies from "js-cookie";
import { useState } from "react";

export const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { removeSession } = useSessionStore();

  const exec = () => {
    setIsLoading(true);

    Cookies.remove("session");
    removeSession();

    setIsLoading(false);
  };

  return { exec, isLoading };
};
