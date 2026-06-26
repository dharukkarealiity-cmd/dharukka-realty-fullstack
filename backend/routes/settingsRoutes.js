const express = require("express");
const router = express.Router();
const Settings = require("../models/Settings");

// GET address
router.get("/", async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({ address: "" });
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// PUT update address
router.put("/", async (req, res) => {
  try {
    const { address } = req.body;
    let settings = await Settings.findOne();
    if (!settings) settings = await Settings.create({ address });
    else { settings.address = address; await settings.save(); }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
