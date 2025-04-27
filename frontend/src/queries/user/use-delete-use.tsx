import { deleteUserByIdService } from "@/services/user.services";
import { useMutation } from "@tanstack/react-query";

export const useDeleteUserById = () => {
  return useMutation({
    mutationFn: deleteUserByIdService,
  });
};
