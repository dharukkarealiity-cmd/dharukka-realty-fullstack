const express = require("express");
const router = express.Router();
const Gallery = require("../models/Gallery");

// GET all gallery images
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// POST add new image
router.post("/", async (req, res) => {
  try {
    const image = new Gallery(req.body);
    await image.save();
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// DELETE image
router.delete("/:id", async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;