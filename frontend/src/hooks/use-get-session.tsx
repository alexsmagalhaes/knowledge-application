import { useValidateToken } from "@/queries/use-validate-token";
import { useSessionStore } from "@/store/use-session-store";
import Cookies from "js-cookie";
import { useEffect, useState, useCallback } from "react";
import { IAuthSession } from "@/types/auth";

export const useGetSession = () => {
  const { setSession, removeSession } = useSessionStore();
  const { mutateAsync } = useValidateToken();

  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState<boolean | undefined>(undefined);
  const [session, setLocalSession] = useState<IAuthSession | undefined>(
    undefined
  );

  const getSessionFromCookie = (): IAuthSession | undefined => {
    const session = Cookies.get("session");
    try {
      const parsed = JSON.parse(session || "{}");
      if (parsed.token && parsed.id) {
        return parsed as IAuthSession;
      }
      return undefined;
    } catch (e) {
      return undefined;
    }
  };

  const retrieveSession = useCallback(async () => {
    const currentSession = getSessionFromCookie();
    setLocalSession(currentSession);

    if (!currentSession?.token) {
      removeSession();
      setIsValid(false);
      setIsLoading(false);
      return;
    }

    try {
      const isValidResult = await mutateAsync({ token: currentSession.token });
      setIsValid(isValidResult);

      if (!isValidResult) {
        removeSession();
        setLocalSession(undefined);
        return;
      }

      setSession(currentSession);
    } catch (error) {
      console.error("Sessão inválida!", error);
      removeSession();
      setIsValid(false);
      setLocalSession(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [mutateAsync, removeSession, setSession]);

  useEffect(() => {
    retrieveSession();
  }, [retrieveSession]);

  return {
    isLoading,
    isValid,
    session,
    revalidate: retrieveSession,
  };
};
