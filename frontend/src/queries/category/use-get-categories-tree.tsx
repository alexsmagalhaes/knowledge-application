import { getCategoriesTree } from "@/services/category.services";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoriesTree = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesTree,
  });
};
