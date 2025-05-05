import { httpClient } from "../libs/axios/http-request";

type TStat = Stat;

export const getAllStatsService = async () => {
  await httpClient.get<TStat>("/stats");
};

type TSupport = {
  type: string;
  description: string;
};

export const createSupportCardService = async (payload: TSupport) => {
  await httpClient.post("/support", payload);
};
