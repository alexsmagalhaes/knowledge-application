import { useValidateToken } from "@/queries/use-validate-token";
import { useSessionStore } from "@/store/use-session-store";
import Cookies from "js-cookie";
import { useEffect, useState, useCallback } from "react";

export const useGetSession = () => {
  const { removeSession } = useSessionStore();
  const { mutateAsync } = useValidateToken();

  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [token, setToken] = useState<string>("");

  const getToken = () => Cookies.get("session") || "";

  const retrieveSession = useCallback(async () => {
    const currentToken = getToken();
    setToken(currentToken);

    if (!currentToken) {
      removeSession();
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    try {
      const isValidResult = await mutateAsync({ token: currentToken });
      setIsValid(isValidResult);

      if (!isValidResult) removeSession();
    } catch (error) {
      console.error("Sessão inválida!", error);
      removeSession();
      setIsValid(false);
    } finally {
      setIsLoading(false);
    }
  }, [mutateAsync, removeSession]);

  useEffect(() => {
    retrieveSession();
  }, [retrieveSession]);

  return {
    isLoading,
    isValid,
    token,
    revalidate: retrieveSession,
  };
};
