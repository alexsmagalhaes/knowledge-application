import { useMutation } from "@tanstack/react-query";
import { resgisterService } from "@/services/auth.services";

export const useRegister = () => {
  return useMutation({
    mutationFn: resgisterService,
  });
};
