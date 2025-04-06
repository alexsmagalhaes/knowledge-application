import { createArticleService } from "@/services/article";
import { useMutation } from "@tanstack/react-query";

export const useCreateArticle = () => {
  return useMutation({
    mutationFn: createArticleService,
  });
};
