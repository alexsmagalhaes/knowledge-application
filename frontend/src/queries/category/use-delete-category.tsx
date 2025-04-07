import { deleteCategoryByIdService } from "@/services/category";
import { useMutation } from "@tanstack/react-query";

export const useDeleteCategoryById = () => {
  return useMutation({
    mutationFn: deleteCategoryByIdService,
  });
};
