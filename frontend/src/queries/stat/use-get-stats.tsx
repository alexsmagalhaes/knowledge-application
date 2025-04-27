import { getAllStatsService } from "@/services/others.services";
import { useQuery } from "@tanstack/react-query";

export const useGetStats = () => {
  return useQuery({
    queryKey: ["stats"],
    queryFn: getAllStatsService,
  });
};
