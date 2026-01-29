const express = require("express");
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const {
  getHeroSlides,
  getAllHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} = require("../controllers/heroController");

const router = express.Router();

router.get("/", getHeroSlides); // public
router.get("/admin", auth, getAllHeroSlides);

router.post(
  "/",
  auth,
  upload.single("image"),
  createHeroSlide
);

router.put(
  "/:id",
  auth,
  upload.single("image"),
  updateHeroSlide
);

router.delete("/:id", auth, deleteHeroSlide);

module.exports = router;
