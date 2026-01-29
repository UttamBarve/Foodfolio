const express = require("express");
const {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menuController");

const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getMenu); // Public

router.post(
  "/",
  auth,
  upload.single("image"),
  createMenu
); // Admin

router.put(
  "/:id",
  auth,
  upload.single("image"),
  updateMenu
); // Admin

router.delete("/:id", auth, deleteMenu); // Admin

module.exports = router;
