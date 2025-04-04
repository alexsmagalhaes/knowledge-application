import { IAuthSession } from "@/types/auth";
import { httpClient } from "./axios-http-request";

type TLogin = {
  email: string;
  password: string;
};

export const loginService = async (payload: TLogin) =>
  await httpClient.post<IAuthSession>("/signin", payload);
