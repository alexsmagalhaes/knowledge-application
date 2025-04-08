import { getAllStatsService } from "@/services/stat";
import { useQuery } from "@tanstack/react-query";

export const useGetStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getAllStatsService,
  });
};
