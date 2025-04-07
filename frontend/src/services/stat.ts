import { Stat } from "@/types/Stat";
import { httpClient } from "./axios-http-request";

type TStat = Stat;

export const getAllStatsService = async () => {
  await httpClient.get<TStat>("/stats");
};
