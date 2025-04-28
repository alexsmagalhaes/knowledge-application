import {
  createUserService,
  deleteUserByIdService,
  getUserByIdService,
  getAllUsersService,
} from "@/services/user.services";
import { useMutation, useQuery } from "@tanstack/react-query";

function useUser() {
  const create = () =>
    useMutation({
      mutationFn: createUserService,
    });

  const remove = () =>
    useMutation({
      mutationFn: deleteUserByIdService,
    });

  const getById = (id: number) =>
    useQuery({
      queryKey: ["categoryById", id],
      queryFn: () => getUserByIdService({ id }),
      enabled: !!id,
    });

  const getAll = () =>
    useQuery({
      queryKey: ["users"],
      queryFn: getAllUsersService,
    });

  return { create, remove, getById, getAll };
}

export default useUser;
