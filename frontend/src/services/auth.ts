import { IAuthSession } from "@/types/auth";
import { httpClient } from "./axios-http-request";

type TLogin = {
  email: string;
  password: string;
};

export const loginService = async (payload: TLogin) =>
  await httpClient.post<IAuthSession>("/signin", payload);

type TRegister = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const resgisterService = async (payload: TRegister) =>
  await httpClient.post<IAuthSession>("/signup", payload);

type TValidateToken = {
  token: string;
};

export const validadeTokenService = async (payload: TValidateToken) =>
  await httpClient.post<boolean>("/validateToken", payload);
