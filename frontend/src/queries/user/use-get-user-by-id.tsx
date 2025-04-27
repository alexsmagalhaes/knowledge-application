import { getUserByIdService } from "@/services/user.services";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (id: number) => {
  return useQuery({
    queryKey: ["categoryById", id],
    queryFn: () => getUserByIdService({ id }),
    enabled: !!id,
  });
};
