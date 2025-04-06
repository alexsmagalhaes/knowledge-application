import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/services/auth";
import { useSessionStore } from "@/store/use-session-store";
import { IAuthSession } from "@/types/auth";
import Cookies from "js-cookie";

export const useLogin = () => {
  const { setSession } = useSessionStore();

  return useMutation({
    mutationFn: loginService,
    onSuccess: (data: IAuthSession) => {
      setSession({ ...data });
      Cookies.set("session", JSON.stringify(data));
    },
  });
};
