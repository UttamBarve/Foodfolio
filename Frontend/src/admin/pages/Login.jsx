import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRequest } from "../../services/api"; // adjust path if needed

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await apiRequest(
        "/api/admin/login",
        "POST",
        { email, password }
      );

      // store JWT
      localStorage.setItem("admin-token", res.token);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <h2>Foodfolio Admin</h2>
        <p>Login to manage your restaurant</p>

        <input
          type="email"
          placeholder="Admin email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        {error && (
          <p style={{ marginTop: "10px", color: "red" }}>
            {error}
          </p>
        )}

        <p
          style={{ marginTop: "15px", cursor: "pointer", color: "#f2c94c" }}
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </p>
      </form>
    </div>
  );
};

export default Login;
