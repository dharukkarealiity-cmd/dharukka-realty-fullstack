const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  address: { type: String, default: "" },
});

module.exports = mongoose.model("Settings", settingsSchema);
