import { deleteCategoryByIdService } from "@/services/category.services";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCategoryById = () => {
  return useMutation({
    mutationFn: deleteCategoryByIdService,
  });
};
