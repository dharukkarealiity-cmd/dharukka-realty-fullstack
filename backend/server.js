const projectRoutes = require("./routes/projectRoutes");
const adminRoutes = require("./routes/adminRoutes");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

console.log("NEW SERVER VERSION RUNNING");

app.use(cors());
app.use(express.json());
app.use("/api/projects", projectRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

const contactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  interest: String,
  message: String,
  contacted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const visitSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  property: String,
  message: String,
  contacted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const Contact = mongoose.model("Contact", contactSchema);
const Visit = mongoose.model("Visit", visitSchema);

app.get("/", (req, res) => {
  res.send("Dharukka Realty Backend Running");
});

// ===== CONTACT ROUTES =====
app.post("/api/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ success: true, message: "Contact saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving contact" });
  }
});

app.get("/api/contacts", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

app.delete("/api/contacts/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.patch("/api/contacts/:id/contacted", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    contact.contacted = !contact.contacted;
    await contact.save();
    res.json({ success: true, contacted: contact.contacted });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

// ===== VISIT ROUTES =====
app.post("/api/visit", async (req, res) => {
  try {
    const visit = new Visit(req.body);
    await visit.save();
    res.status(201).json({ success: true, message: "Visit saved successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving visit" });
  }
});

app.get("/api/visits", async (req, res) => {
  const visits = await Visit.find().sort({ createdAt: -1 });
  res.json(visits);
});

app.delete("/api/visits/:id", async (req, res) => {
  try {
    await Visit.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.patch("/api/visits/:id/contacted", async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);
    visit.contacted = !visit.contacted;
    await visit.save();
    res.json({ success: true, contacted: visit.contacted });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});