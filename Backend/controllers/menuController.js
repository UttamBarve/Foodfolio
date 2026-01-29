const Menu = require("../models/Menu");

// PUBLIC – Get active menu items
exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.find({ isActive: true });
    res.json(menu);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch menu" });
  }
};

// ADMIN – Create menu item
exports.createMenu = async (req, res) => {
  try {
    // If image uploaded, attach Cloudinary URL
    if (req.file) {
      req.body.image = req.file.path; // Cloudinary secure_url
    }

    const menuItem = await Menu.create(req.body);
    res.status(201).json(menuItem);
  } catch (err) {
    res.status(400).json({ message: "Failed to create menu item" });
  }
};

// ADMIN – Update menu item
exports.updateMenu = async (req, res) => {
  try {
    // Replace image only if new file uploaded
    if (req.file) {
      req.body.image = req.file.path;
    }

    const updated = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Failed to update menu item" });
  }
};

// ADMIN – Delete menu item
exports.deleteMenu = async (req, res) => {
  try {
    await Menu.findByIdAndDelete(req.params.id);
    res.json({ message: "Menu item deleted" });
  } catch (err) {
    res.status(400).json({ message: "Failed to delete menu item" });
  }
};
