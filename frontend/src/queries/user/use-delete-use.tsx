import { deleteUserByIdService } from "@/services/user";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUserById = () => {
  return useMutation({
    mutationFn: deleteUserByIdService,
  });
};
