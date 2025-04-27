import { deleteArticleByIdService } from "@/services/article.services";
import { useMutation } from "@tanstack/react-query";

export const useDeleteArticleById = () => {
  return useMutation({
    mutationFn: deleteArticleByIdService,
  });
};
