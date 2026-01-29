const express = require("express");
const {
  createReservation,
  getReservations,
  updateReservation,
} = require("../controllers/reservationController");

const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createReservation);         // Public
router.get("/", auth, getReservations);      // Admin
router.put("/:id", auth, updateReservation); // Admin

module.exports = router;
