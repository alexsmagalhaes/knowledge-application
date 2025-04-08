import { useSessionStore } from "@/store/use-session-store";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

interface IProtectedRouter {
  children: ReactElement;
  isAdmin: boolean;
}

function ProtectedRouter({ children, isAdmin = false }: IProtectedRouter) {
  const { session } = useSessionStore();

  if (!session) return <Navigate to="/login" />;
  if (!isAdmin && !session.admin) return <Navigate to="/dashboard" />;

  return children;
}

export default ProtectedRouter;
