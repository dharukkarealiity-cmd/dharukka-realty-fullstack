const express = require("express");
const router = express.Router();
const Project = require("../models/Project"); // adjust path to match your project structure

console.log("PROJECT ROUTES LOADED");

router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/test", (req, res) => {
  res.send("TEST ROUTE WORKING");
});

// NEW: get a single project by its MongoDB _id — used by the public
// ProjectDetails page to fetch the project matching /project/:id
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json(project);
  } catch (error) {
    // Invalid ObjectId format also lands here
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("CREATE PROJECT:", req.body);

    const project = new Project(req.body);
    await project.save();

    res.status(201).json({
      success: true,
      message: "Project created",
      project,
    });
  } catch (error) {
    console.log("CREATE ERROR:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log("DELETE HIT:", req.params.id);

    const deleted = await Project.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project deleted",
      id: req.params.id,
    });
  } catch (error) {
    console.log("DELETE ERROR:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // returns the updated doc instead of the old one
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Project not found" });
    }

    res.json({ success: true, project: updated });
  } catch (error) {
    console.log("UPDATE ERROR:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;