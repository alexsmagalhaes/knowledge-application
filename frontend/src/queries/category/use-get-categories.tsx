import { getAllCategoriesService } from "@/services/category.services";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategoriesService,
  });
};
