import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AdminRoutes from "./admin/routes/AdminRoutes";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

function App() {
  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route
        path="/"
        element={
          <>
            <Header />
            <Home />
            <Footer />
          </>
        }
      />

      {/* ADMIN ROUTES */}
      <Route path="/admin/*" element={<AdminRoutes />} />
    </Routes>
  );
}

export default App;
