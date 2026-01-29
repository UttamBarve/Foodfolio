import { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("admin-token");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await apiRequest(
          "/api/reservations",
          "GET",
          null,
          token
        );
        setReservations(data);
      } catch (err) {
        console.error("Failed to fetch reservations", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [token]);

  const updateStatus = async (id, status) => {
    try {
      await apiRequest(
        `/api/reservations/${id}`,
        "PUT",
        { status },
        token
      );

      setReservations((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status } : r
        )
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  return (
    <>
      <h1>Reservations</h1>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Phone</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  Loading reservations...
                </td>
              </tr>
            ) : reservations.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No reservations found
                </td>
              </tr>
            ) : (
              reservations.map((r) => (
                <tr key={r._id}>
                  <td>{r.name}</td>
                  <td>{r.date?.split("T")[0]}</td>
                  <td>{r.time}</td>
                  <td>{r.guests}</td>
                  <td>{r.phone}</td>
                  <td>
                    <select
                      className={`status ${r.status}`}
                      value={r.status}
                      onChange={(e) =>
                        updateStatus(r._id, e.target.value)
                      }
                    >
                      <option class='back' value="pending">Pending</option>
                      <option class='back' value="confirmed">Confirmed</option>
                      <option class='back' value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reservations;
