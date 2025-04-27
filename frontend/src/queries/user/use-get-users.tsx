import { getAllUsersService } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";

export const useGetUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersService,
  });
};
