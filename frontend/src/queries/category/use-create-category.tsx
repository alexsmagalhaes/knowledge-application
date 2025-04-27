import { createCategoryService } from "@/services/category.services";
import { useMutation } from "@tanstack/react-query";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategoryService,
  });
};
