import { getAllUsersService } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersService,
  });
};
