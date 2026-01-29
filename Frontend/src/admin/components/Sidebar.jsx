import { NavLink } from "react-router-dom";
import logo from "/assets/images/logo.png";
const Sidebar = () => {
  return (
    <aside className="admin-sidebar">
       <a href="/" className="logo">
                  <img src={logo} width="200" height="80" alt="Foodfolio Home" />
                </a>

      <nav>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/menu">Menu</NavLink>
        <NavLink to="/admin/hero">Hero</NavLink>
        <NavLink to="/admin/reservations">Reservations</NavLink>
      </nav>
      <a href="/" className="go-home-link">← View Website</a>
    </aside>

  );
};

export default Sidebar;
