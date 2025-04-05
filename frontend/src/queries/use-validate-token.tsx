import { validadeTokenService } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";

export const useValidateToken = () => {
  return useMutation({
    mutationFn: validadeTokenService,
  });
};
