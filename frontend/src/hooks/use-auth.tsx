import {
  loginService,
  resgisterService,
  validadeTokenService,
} from "@/services/auth.services";
import { useSessionStore } from "@/store/use-session.store";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useState } from "react";
import useSnack from "@/hooks/use-snack"; 

function useAuth() {
  const { setSession, removeSession } = useSessionStore();
  const { handleOpen } = useSnack();
  const [session, setLocalSession] = useState<IAuthSession | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);
  const [isValidSession, setIsValidSession] = useState<boolean | undefined>(
    undefined
  );

  const login = useMutation({
    mutationFn: loginService,
    onSuccess: (data: IAuthSession) => {
      setSession({ ...data });
      Cookies.set("session", JSON.stringify(data));
      setLocalSession(data);
    },
  });

  const register = useMutation({
    mutationFn: resgisterService,
  });

  const validateToken = useMutation({
    mutationFn: validadeTokenService,
  });

  const logout = () => {
    Cookies.remove("session");
    removeSession();
    setLocalSession(null);
    setIsValidSession(false);
  };

  const retrieveSession = async () => {
    setIsLoadingSession(true);

    const sessionCookie = Cookies.get("session");
    if (!sessionCookie) {
      removeSession();
      setIsValidSession(false);
      setIsLoadingSession(false);
      return;
    }

    let parsedSession: IAuthSession | undefined = undefined;
    try {
      parsedSession = JSON.parse(sessionCookie);
    } catch (e) {
      parsedSession = undefined;
    }

    if (!parsedSession?.token || !parsedSession?.id) {
      removeSession();
      setIsValidSession(false);
      setIsLoadingSession(false);
      return;
    }

    setLocalSession(parsedSession);
    try {
      const isValid = await validateToken.mutateAsync({
        token: parsedSession.token,
      });
      setIsValidSession(isValid);
      if (isValid) {
        setSession(parsedSession);
        handleOpen({
          message: "Sessão recuperada com sucesso!",
          type: "success",
        });
      } else {
        removeSession();
        setLocalSession(null);
      }
    } catch (error) {
      console.error("Erro ao validar sessão:", error);
      removeSession();
      setIsValidSession(false);
      setLocalSession(null);
    } finally {
      setIsLoadingSession(false);
    }
  };

  return {
    login,
    register,
    logout,
    session,
    isLoadingSession,
    isValidSession,
    revalidateSession: retrieveSession,
  };
}

export default useAuth;
