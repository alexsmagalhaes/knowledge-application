import { getAllArticlesService } from "@/services/article.services";
import { useQuery } from "@tanstack/react-query";

export const useGetArticles = () => {
  return useQuery({
    queryKey: ["articles"],
    queryFn: getAllArticlesService,
  });
};
