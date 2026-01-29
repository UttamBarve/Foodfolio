import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Menu from "../pages/Menu";
import Reservations from "../pages/Reservations";
import Hero from "../pages/Hero";
import AdminLayout from "../components/AdminLayout";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="menu" element={<Menu />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="hero" element={<Hero />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
