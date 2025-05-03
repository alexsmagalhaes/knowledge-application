import { httpClient } from "../libs/axios/http-request";

export const getAllUsersService = async () => {
  await httpClient.get<User[]>("/users");
};

type TUserById = {
  id: number;
};
export const getUserByIdService = async (payload: TUserById) => {
  await httpClient.get<User>(`/users/${payload.id}`);
};

type TUser = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export const createUserService = async (payload: TUser) => {
  await httpClient.post("/users", payload);
};

type TUserDelete = {
  id: number;
};
export const deleteUserByIdService = async (payload: TUserDelete) => {
  await httpClient.delete(`/users/${payload.id}`);
};
