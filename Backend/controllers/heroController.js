const Hero = require("../models/Hero");

// PUBLIC – get active slides
exports.getHeroSlides = async (req, res) => {
  try {
    const slides = await Hero.find({ isActive: true });
    res.json(slides);
  } catch {
    res.status(500).json({ message: "Failed to fetch hero slides" });
  }
};

// ADMIN – get all slides
exports.getAllHeroSlides = async (req, res) => {
  const slides = await Hero.find();
  res.json(slides);
};

// ADMIN – create slide
exports.createHeroSlide = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path; // Cloudinary URL
    }

    const slide = await Hero.create(req.body);
    res.status(201).json(slide);
  } catch {
    res.status(400).json({ message: "Failed to create hero slide" });
  }
};

// ADMIN – update slide
exports.updateHeroSlide = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }

    const updated = await Hero.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch {
    res.status(400).json({ message: "Failed to update hero slide" });
  }
};

// ADMIN – delete slide
exports.deleteHeroSlide = async (req, res) => {
  try {
    await Hero.findByIdAndDelete(req.params.id);
    res.json({ message: "Slide deleted" });
  } catch {
    res.status(400).json({ message: "Failed to delete hero slide" });
  }
};
