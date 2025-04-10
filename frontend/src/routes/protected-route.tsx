import { useSessionStore } from "@/store/use-session-store";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

type TRoleLevel = "admin" | "member" | "public";

interface IProtectedRouter {
  children: ReactElement;
  allowedRoles: TRoleLevel[];
  fallback: string;
}

function ProtectedRouter({
  children,
  allowedRoles,
  fallback,
}: IProtectedRouter) {
  const { session } = useSessionStore();

  let userRole: TRoleLevel = "admin";

  if (session && !session?.admin) userRole = "member";
  if (!session) userRole = "public";

  if (allowedRoles.includes(userRole)) return children;

  return <Navigate to={fallback} />;
}

export default ProtectedRouter;
