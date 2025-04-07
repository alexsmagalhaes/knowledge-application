import { updateArticleService } from "@/services/article";
import { useMutation } from "@tanstack/react-query";

export const useUpdateArticle = () => {
  return useMutation({
    mutationFn: updateArticleService,
  });
};
