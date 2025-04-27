import { httpClient } from "../libs/axios/http-request";

export const getAllCategoriesService = async () => {
  await httpClient.get("/categories");
};

type TCategoryById = {
  id: number;
};
export const getCategoryByIdService = async (payload: TCategoryById) => {
  await httpClient.get(`/categories/${payload.id}`);
};

type TCategory = {
  id?: number;
  name: string;
};
export const createCategoryService = async (payload: TCategory) => {
  await httpClient.post("/categories", payload);
};

type TCategoryDelete = {
  id: number;
};
export const deleteCategoryByIdService = async (payload: TCategoryDelete) => {
  await httpClient.delete(`/categories/${payload.id}`);
};

type TCategoryTree = {
  id: number;
  name: string;
  parentId: null | number;
  children: TCategoryTree[];
};

export const getCategoriesTree = async () => {
  await httpClient.get<TCategoryTree>("/categories/tree");
};
