import {
  createArticleService,
  deleteArticleByIdService,
  getAllArticlesService,
  getArticleByIdService,
  getArticlesByCategoryIdService,
  updateArticleService,
} from "@/services/article.services";
import { useMutation, useQuery } from "@tanstack/react-query";

function useArticle() {
  const create = () =>
    useMutation({
      mutationFn: createArticleService,
    });

  const remove = () =>
    useMutation({
      mutationFn: deleteArticleByIdService,
    });

  const getById = (id: number) =>
    useQuery({
      queryKey: ["article", id],
      queryFn: () => getArticleByIdService({ id }),
      enabled: !!id,
    });

  const getByCategoryId = (categoryId: number) =>
    useQuery({
      queryKey: ["articles-by-category", categoryId],
      queryFn: () => getArticlesByCategoryIdService({ id: categoryId }),
      enabled: !!categoryId,
    });

  const getAll = () =>
    useQuery({
      queryKey: ["articles"],
      queryFn: getAllArticlesService,
    });

  const update = () =>
    useMutation({
      mutationFn: updateArticleService,
    });

  return { create, remove, getById, getByCategoryId, getAll, update };
}

export default useArticle;
