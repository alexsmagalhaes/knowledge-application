import { createUserService } from "@/services/user";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUserService,
  });
};
