import { createUserService } from "@/services/user.services";
import { useMutation } from "@tanstack/react-query";

export const useCreateUser = () => {
  return useMutation({
    mutationFn: createUserService,
  });
};
