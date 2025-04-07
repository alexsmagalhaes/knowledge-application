import { deleteArticleByIdService } from "@/services/article";
import { useMutation } from "@tanstack/react-query";

export const useDeleteArticleById = () => {
  return useMutation({
    mutationFn: deleteArticleByIdService,
  });
};
