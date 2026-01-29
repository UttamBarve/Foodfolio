import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const Dashboard = () => {
  const [menuCount, setMenuCount] = useState(0);
  const [reservationCount, setReservationCount] = useState(0);
  const [heroCount, setHeroCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("admin-token");

  useEffect(() => {
    document.title = "Admin | Foodfolio";
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [menu, reservations, hero] = await Promise.all([
          apiRequest("/api/menu"),
          apiRequest("/api/reservations", "GET", null, token),
          apiRequest("/api/hero/admin", "GET", null, token),
        ]);

        setMenuCount(menu.length);
        setReservationCount(reservations.length);
        setHeroCount(hero.length);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [token]);

  return (
    <>
      <h1>Dashboard</h1>

      <div className="admin-cards">
        <div className="admin-card">
          <h3>Total Menu Items</h3>
          <p>{loading ? "—" : menuCount}</p>
        </div>

        <div className="admin-card">
          <h3>Reservations</h3>
          <p>{loading ? "—" : reservationCount}</p>
        </div>

        <div className="admin-card">
          <h3>Hero Slides</h3>
          <p>{loading ? "—" : heroCount}</p>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
