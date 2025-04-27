import { updateArticleService } from "@/services/article.services";
import { useMutation } from "@tanstack/react-query";

export const useUpdateArticle = () => {
  return useMutation({
    mutationFn: updateArticleService,
  });
};
