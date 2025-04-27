import { createArticleService } from "@/services/article.services";
import { useMutation } from "@tanstack/react-query";

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: createArticleService,
  });
};
