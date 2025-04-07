import { getArticleByIdService } from "@/services/article";
import { useQuery } from "@tanstack/react-query";

export const useGetArticleById = (id: number) => {
  return useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleByIdService({ id }),
    enabled: !!id,
  });
};
