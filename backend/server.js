const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://dharukka-realty-fullstack.vercel.app",
  "https://dharukka-realty-fullstack-six.vercel.app"
],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());
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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const visitSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  property: String,
  message: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);
const Visit = mongoose.model("Visit", visitSchema);

app.get("/", (req, res) => {
  res.send("Dharukka Realty Backend Running");
});

app.post("/api/contact", async (req, res) => {
  try {
    console.log("Contact form data:", req.body);

    const contact = new Contact(req.body);
    await contact.save();

    res.status(201).json({
      success: true,
      message: "Contact saved successfully",
    });
  } catch (error) {
    console.log("Contact save error:", error);

    res.status(500).json({
      success: false,
      message: "Error saving contact",
    });
  }
});

app.post("/api/visit", async (req, res) => {
  try {
    console.log("Visit form data:", req.body);

    const visit = new Visit(req.body);
    await visit.save();

    res.status(201).json({
      success: true,
      message: "Visit saved successfully",
    });
  } catch (error) {
    console.log("Visit save error:", error);

    res.status(500).json({
      success: false,
      message: "Error saving visit",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/api/contacts", async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
});

app.get("/api/visits", async (req, res) => {
  const visits = await Visit.find().sort({ createdAt: -1 });
  res.json(visits);
});