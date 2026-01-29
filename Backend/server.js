const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173", // local frontend
      "https://foodfolio-uttambarve.vercel.app/", // will update later
    ],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/reservations", require("./routes/reservationRoutes"));
app.use("/api/hero", require("./routes/heroRoutes"));

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
