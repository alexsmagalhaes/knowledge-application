import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/dashboard";

function Outlet() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Outlet;
