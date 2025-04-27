import { validadeTokenService } from "@/services/auth.services";
import { useMutation } from "@tanstack/react-query";

export const useValidateToken = () => {
  return useMutation({
    mutationFn: validadeTokenService,
  });
};
