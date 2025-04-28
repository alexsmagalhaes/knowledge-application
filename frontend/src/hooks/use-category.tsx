import {
  createCategoryService,
  deleteCategoryByIdService,
  getAllCategoriesService,
  getCategoriesTree,
  getCategoryByIdService,
} from "@/services/category.services";
import { useMutation, useQuery } from "@tanstack/react-query";

function useCategory() {
  const create = () =>
    useMutation({
      mutationFn: createCategoryService,
    });

  const remove = () =>
    useMutation({
      mutationFn: deleteCategoryByIdService,
    });

  const getTree = () =>
    useQuery({
      queryKey: ["categories"],
      queryFn: getCategoriesTree,
    });

  const getAll = () =>
    useQuery({
      queryKey: ["categories"],
      queryFn: getAllCategoriesService,
    });

  const getById = (id: number) =>
    useQuery({
      queryKey: ["categoryById", id],
      queryFn: () => getCategoryByIdService({ id }),
      enabled: !!id,
    });

  return { create, remove, getAll, getTree, getById };
}

export default useCategory;
