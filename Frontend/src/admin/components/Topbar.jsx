import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("admin-auth");
    navigate("/admin/login");
  };

  return (
    <div className="admin-topbar">
      <span>Admin Panel</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Topbar