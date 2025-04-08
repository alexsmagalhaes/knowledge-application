import { Stat } from "@/types/stat";
import { httpClient } from "./axios-http-request";

type TStat = Stat;

export const getAllStatsService = async () => {
  await httpClient.get<TStat>("/stats");
};
