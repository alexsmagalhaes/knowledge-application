import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/dashboard/page";
import ProtectedRouter from "./protected.routes";
import Login from "@/pages/auth/page";

function Outlet() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRouter
            allowedRoles={["admin", "member"]}
            fallback={"/auth"}
          >
            <Dashboard />
          </ProtectedRouter>
        }
      />

      <Route
        path="/auth"
        element={
          <ProtectedRouter allowedRoles={["public"]} fallback={"/"}>
            <Login />
          </ProtectedRouter>
        }
      />
    </Routes>
  );
}

export default Outlet;
