import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/dashboard";
import ProtectedRouter from "./protected.routes";
import Login from "@/pages/auth";

function Outlet() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouter
              allowedRoles={["admin", "member"]}
              fallback={"/login"}
            >
              <Dashboard />
            </ProtectedRouter>
          }
        />

        <Route
          path="/login"
          element={
            <ProtectedRouter allowedRoles={["public"]} fallback={"/"}>
              <Login />
            </ProtectedRouter>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Outlet;
