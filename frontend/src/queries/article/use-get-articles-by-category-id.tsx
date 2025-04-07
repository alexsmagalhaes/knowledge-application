import { getArticlesByCategoryIdService } from "@/services/article";
import { useQuery } from "@tanstack/react-query";

export const useGetArticlesByCategoryId = (categoryId: number) => {
  return useQuery({
    queryKey: ["articles-by-category", categoryId],
    queryFn: () => getArticlesByCategoryIdService({ id: categoryId }),
    enabled: !!categoryId,
  });
};
