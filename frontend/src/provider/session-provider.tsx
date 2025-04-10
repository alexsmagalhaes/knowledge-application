import { useGetSession } from "@/hooks/use-get-session";
import { ReactNode } from "react";

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const { isLoading } = useGetSession();

  if (isLoading) return null;

  return children;
};
