import { createSupportCardService } from "@/services/others.services";
import { useMutation } from "@tanstack/react-query";

function useSupport() {
  const create = useMutation({
    mutationFn: createSupportCardService,
  });

  return { create };
}

export default useSupport;
