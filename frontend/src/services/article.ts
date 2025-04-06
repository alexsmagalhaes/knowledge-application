import { httpClient } from "./axios-http-request";

export const getAllArticlesService = async () => {
  await httpClient.get("/articles");
};

type TArticleById = {
  id: number;
};
export const getArticleByIdService = async (payload: TArticleById) => {
  await httpClient.get(`/articles/${payload.id}`);
};

type TArticlesByCategory = {
  id: number;
};
export const getArticlesByCategoryIdService = async (
  payload: TArticlesByCategory
) => {
  await httpClient.get(`/categories/${payload.id}/articles`);
};

type TArticle = {
  name: string;
  description: string;
  categoryId: number;
  userId: number;
  content: string;
};
export const createArticleService = async (payload: TArticle) => {
  await httpClient.post("/articles", payload);
};

type TArticleDelete = {
  id: number;
};
export const deleteArticleByIdService = async (payload: TArticleDelete) => {
  await httpClient.delete(`/articles/${payload.id}`);
};
