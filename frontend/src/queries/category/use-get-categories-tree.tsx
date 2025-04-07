import { getCategoriesTree } from "@/services/category";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoriesTree = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesTree,
  });
};
