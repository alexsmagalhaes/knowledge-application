import { useGetSession } from "@/hooks/use-get-session";
import useSnack from "@/hooks/use-snack";
import { ReactNode, useEffect } from "react";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading, isValid } = useGetSession();
  const { handleOpen } = useSnack();

  useEffect(() => {
    if (!isLoading && isValid) {
      handleOpen({
        message: "Sessão recuperada com sucesso!",
        type: "success",
      });
    }
  }, [isLoading, isValid, handleOpen]);

  if (isLoading) {
    return null;
  }
  return children;
};
