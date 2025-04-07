import { getAllStatsService } from "@/services/stats";
import { useQuery } from "@tanstack/react-query";

export const useGetStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getAllStatsService,
  });
};
