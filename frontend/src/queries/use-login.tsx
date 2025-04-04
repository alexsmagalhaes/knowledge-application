import { useMutation } from "@tanstack/react-query";
import { loginService } from "@/services/auth";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginService,
  });
};
