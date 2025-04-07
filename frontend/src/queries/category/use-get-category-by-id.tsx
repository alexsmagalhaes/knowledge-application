import { getCategoryByIdService } from "@/services/category";
import { useQuery } from "@tanstack/react-query";

export const useGetCategoryById = (id: number) => {
  return useQuery({
    queryKey: ["categoryById", id],
    queryFn: () => getCategoryByIdService({ id }),
    enabled: !!id,
  });
};
