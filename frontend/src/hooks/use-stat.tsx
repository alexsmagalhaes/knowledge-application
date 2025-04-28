import { getAllStatsService } from "@/services/others.services";
import { useQuery } from "@tanstack/react-query";

function useUser() {
  const getAll = () =>
    useQuery({
      queryKey: ["stats"],
      queryFn: getAllStatsService,
    });

  return {
    getAll,
  };
}

export default useUser;
