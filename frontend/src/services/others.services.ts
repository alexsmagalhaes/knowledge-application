import { Stat } from "@/types/other";
import { httpClient } from "../libs/axios/http-request";

type TStat = Stat;

export const getAllStatsService = async () => {
  await httpClient.get<TStat>("/stats");
};
