const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  // ===== EXISTING FIELDS (unchanged) =====
  title: {
    type: String,
    required: true,
  },

  location: String,

  price: String,

  description: String,

  image: String, // main hero/card image

  // ===== NEW: status & basic info =====
  status: {
    type: String,
    enum: ["Ongoing", "Upcoming", "Completed"],
    default: "Ongoing",
  },

  typology: String,        // e.g. "1, 2 & 3 BHK Tenements"
  projectType: String,     // e.g. "Residential"
  completionDate: String,  // e.g. "2026-27"

  // ===== NEW: gallery =====
  // Each image has a URL + caption (matches the 3-image gallery layout)
  gallery: [
    {
      url: String,
      caption: String,
    },
  ],

  // ===== NEW: key plan section =====
  keyPlanImage: String,
  siteAddress: String,

  // ===== NEW: developer contact =====
  contacts: [
    {
      name: String,
      phone: String,
    },
  ],

  // ===== NEW: promises / why choose us =====
  // Simple string arrays since these are just bullet lists
  promisesColumn1: [String],
  promisesColumn2: [String],
  highlights: [String],   // "Why choose [Project]?" bullets

  // ===== NEW: project highlights & amenities =====
  features: [String],     // "Built for today" bullet list
  amenities: [String],    // tags like "24x7 Security", "Common Plot"

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);