import { useMutation } from "@tanstack/react-query";
import { resgisterService } from "@/services/auth";

export const useRegister = () => {
  return useMutation({
    mutationFn: resgisterService,
  });
};
