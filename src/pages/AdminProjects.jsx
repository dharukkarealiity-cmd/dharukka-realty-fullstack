import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminProjects.css";

const API_URL = "http://localhost:5001/api/projects";
const CLOUD_NAME = "dox2zkbxi";
const UPLOAD_PRESET = "ml_default";

const csvToArray = (str) =>
  str.split(",").map((s) => s.trim()).filter((s) => s.length > 0);

const arrayToCsv = (arr) => (arr && arr.length ? arr.join(", ") : "");

const linesToGallery = (str) =>
  str.split("\n").map((line) => line.trim()).filter((line) => line.length > 0)
    .map((line) => {
      const [url, caption] = line.split("|").map((s) => (s ? s.trim() : ""));
      return { url: url || "", caption: caption || "" };
    });

const galleryToLines = (gallery) =>
  gallery && gallery.length
    ? gallery.map((g) => `${g.url || ""} | ${g.caption || ""}`).join("\n")
    : "";

const linesToContacts = (str) =>
  str.split("\n").map((line) => line.trim()).filter((line) => line.length > 0)
    .map((line) => {
      const [name, phone] = line.split("|").map((s) => (s ? s.trim() : ""));
      return { name: name || "", phone: phone || "" };
    });

const contactsToLines = (contacts) =>
  contacts && contacts.length
    ? contacts.map((c) => `${c.name || ""} | ${c.phone || ""}`).join("\n")
    : "";

const emptyForm = {
  title: "", location: "", price: "", description: "",
  image: "", status: "Ongoing", typology: "", projectType: "",
  completionDate: "", siteAddress: "", keyPlanImage: "",
  galleryText: "", contactsText: "", promisesColumn1Text: "",
  promisesColumn2Text: "", highlightsText: "", featuresText: "", amenitiesText: "",
};

function ImageUploader({ label, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, data
      );
      onChange(res.data.secure_url);
    } catch (err) {
      alert("Upload failed — check your Cloudinary config");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-field">
      <label className="admin-label">{label}</label>
      <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
        <input
          className="admin-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Paste URL or upload below"
          style={{ flex: 1 }}
        />
        <button
          type="button"
          className="admin-btn admin-btn--ghost"
          onClick={() => fileRef.current.click()}
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleUpload}
        />
      </div>
      {value && (
        <img
          src={value}
          alt="preview"
          style={{ marginTop: "8px", maxHeight: "120px", borderRadius: "6px", objectFit: "cover" }}
        />
      )}
    </div>
  );
}

function AdminProjects() {
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_URL);
      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const updateField = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const resetForm = () => { setForm(emptyForm); setEditId(null); };

  const buildPayload = () => ({
    title: form.title, location: form.location, price: form.price,
    description: form.description, image: form.image, status: form.status,
    typology: form.typology, projectType: form.projectType,
    completionDate: form.completionDate, siteAddress: form.siteAddress,
    keyPlanImage: form.keyPlanImage,
    gallery: linesToGallery(form.galleryText),
    contacts: linesToContacts(form.contactsText),
    promisesColumn1: csvToArray(form.promisesColumn1Text),
    promisesColumn2: csvToArray(form.promisesColumn2Text),
    highlights: csvToArray(form.highlightsText),
    features: csvToArray(form.featuresText),
    amenities: csvToArray(form.amenitiesText),
  });

  const saveProject = async () => {
    try {
      const payload = buildPayload();
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, payload);
        alert("Project Updated");
      } else {
        await axios.post(API_URL, payload);
        alert("Project Added");
      }
      resetForm();
      fetchProjects();
    } catch (error) {
      console.log(error);
      alert("Error saving project — check console");
    }
  };

  const startEdit = (project) => {
    setForm({
      title: project.title || "", location: project.location || "",
      price: project.price || "", description: project.description || "",
      image: project.image || "", status: project.status || "Ongoing",
      typology: project.typology || "", projectType: project.projectType || "",
      completionDate: project.completionDate || "", siteAddress: project.siteAddress || "",
      keyPlanImage: project.keyPlanImage || "",
      galleryText: galleryToLines(project.gallery),
      contactsText: contactsToLines(project.contacts),
      promisesColumn1Text: arrayToCsv(project.promisesColumn1),
      promisesColumn2Text: arrayToCsv(project.promisesColumn2),
      highlightsText: arrayToCsv(project.highlights),
      featuresText: arrayToCsv(project.features),
      amenitiesText: arrayToCsv(project.amenities),
    });
    setEditId(project._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      if (id === editId) resetForm();
      fetchProjects();
    } catch (error) {
      console.log(error);
    }
  };

  const statusPillClass = (status) => {
    if (status === "Upcoming") return "admin-status-pill admin-status-pill--upcoming";
    if (status === "Completed") return "admin-status-pill admin-status-pill--completed";
    return "admin-status-pill admin-status-pill--ongoing";
  };

  return (
    <div className="admin-projects-page">
      <div className="admin-projects-inner">

        {/* Navbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", paddingBottom: "16px", borderBottom: "1px solid var(--admin-border)" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="admin-btn admin-btn--ghost" style={{ marginLeft: 0 }} onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
            <button className="admin-btn admin-btn--ghost" onClick={() => navigate("/admin/inquiries")}>Inquiries</button>
            <button className="admin-btn admin-btn--ghost" onClick={() => navigate("/admin/leads")}>Leads</button>
          </div>
          <button className="admin-btn admin-btn--ghost" style={{ color: "var(--admin-danger)" }} onClick={logout}>Logout</button>
        </div>

        <h1 className="admin-page-title">
          {editId ? "Edit Project" : "Add Project"}
        </h1>

        {/* BASIC INFO */}
        <div className="admin-section admin-section--basic">
          <h3>Basic Info</h3>
          <div className="admin-field">
            <label className="admin-label">Title</label>
            <input className="admin-input" value={form.title}
              onChange={(e) => updateField("title", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Location</label>
            <input className="admin-input" value={form.location}
              onChange={(e) => updateField("location", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Price</label>
            <input className="admin-input" value={form.price}
              onChange={(e) => updateField("price", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Description</label>
            <textarea className="admin-textarea" value={form.description}
              onChange={(e) => updateField("description", e.target.value)} />
          </div>
          <ImageUploader
            label="Main Image"
            value={form.image}
            onChange={(url) => updateField("image", url)}
          />
        </div>

        {/* STATUS & TYPE */}
        <div className="admin-section admin-section--status">
          <h3>Status & Type</h3>
          <div className="admin-field">
            <label className="admin-label">Status</label>
            <select className="admin-select" value={form.status}
              onChange={(e) => updateField("status", e.target.value)}>
              <option value="Ongoing">Ongoing</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="admin-field">
            <label className="admin-label">Typology</label>
            <div className="admin-hint">e.g. "1, 2 & 3 BHK Tenements"</div>
            <input className="admin-input" value={form.typology}
              onChange={(e) => updateField("typology", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Project Type</label>
            <div className="admin-hint">e.g. "Residential"</div>
            <input className="admin-input" value={form.projectType}
              onChange={(e) => updateField("projectType", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Completion Date</label>
            <div className="admin-hint">e.g. "2026-27"</div>
            <input className="admin-input" value={form.completionDate}
              onChange={(e) => updateField("completionDate", e.target.value)} />
          </div>
        </div>

        {/* GALLERY */}
        <div className="admin-section admin-section--gallery">
          <h3>Gallery</h3>
          <div className="admin-field">
            <div className="admin-hint">
              One image per line: <code>imageUrl | caption</code>
            </div>
            <textarea
              className="admin-textarea admin-textarea--lg"
              value={form.galleryText}
              onChange={(e) => updateField("galleryText", e.target.value)}
            />
          </div>
          <div className="admin-field">
            <label className="admin-label">Upload Gallery Image</label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <input
                type="text"
                className="admin-input"
                placeholder="Caption for this image (optional)"
                id="gallery-caption-input"
              />
              <button
                type="button"
                className="admin-btn admin-btn--ghost"
                onClick={() => document.getElementById("gallery-file-input").click()}
              >
                Upload & Add
              </button>
              <input
                id="gallery-file-input"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const caption = document.getElementById("gallery-caption-input").value.trim();
                  const data = new FormData();
                  data.append("file", file);
                  data.append("upload_preset", UPLOAD_PRESET);
                  try {
                    const res = await axios.post(
                      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, data
                    );
                    const url = res.data.secure_url;
                    const newLine = `${url} | ${caption || ""}`;
                    updateField("galleryText", form.galleryText ? form.galleryText + "\n" + newLine : newLine);
                    document.getElementById("gallery-caption-input").value = "";
                    e.target.value = "";
                  } catch (err) {
                    alert("Gallery upload failed");
                    console.error(err);
                  }
                }}
              />
            </div>
            <div className="admin-hint" style={{ marginTop: "6px" }}>
              Type a caption → click Upload & Add → image URL auto-adds to the list above
            </div>
          </div>
        </div>

        {/* KEY PLAN */}
        <div className="admin-section admin-section--keyplan">
          <h3>Key Plan</h3>
          <ImageUploader
            label="Key Plan Image"
            value={form.keyPlanImage}
            onChange={(url) => updateField("keyPlanImage", url)}
          />
          <div className="admin-field">
            <label className="admin-label">Site Address</label>
            <input className="admin-input" value={form.siteAddress}
              onChange={(e) => updateField("siteAddress", e.target.value)} />
          </div>
        </div>

        {/* CONTACTS */}
        <div className="admin-section admin-section--contacts">
          <h3>Developer Contacts</h3>
          <div className="admin-field">
            <div className="admin-hint">
              One per line: <code>Name | Phone</code>
            </div>
            <textarea className="admin-textarea" value={form.contactsText}
              onChange={(e) => updateField("contactsText", e.target.value)} />
          </div>
        </div>

        {/* LISTS */}
        <div className="admin-section admin-section--lists">
          <h3>Promises & Highlights</h3>
          <div className="admin-field">
            <label className="admin-label">Promises — Column 1</label>
            <div className="admin-hint">Comma-separated</div>
            <textarea className="admin-textarea" value={form.promisesColumn1Text}
              onChange={(e) => updateField("promisesColumn1Text", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Promises — Column 2</label>
            <div className="admin-hint">Comma-separated</div>
            <textarea className="admin-textarea" value={form.promisesColumn2Text}
              onChange={(e) => updateField("promisesColumn2Text", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Highlights</label>
            <div className="admin-hint">Comma-separated</div>
            <textarea className="admin-textarea" value={form.highlightsText}
              onChange={(e) => updateField("highlightsText", e.target.value)} />
          </div>
        </div>

        <div className="admin-section admin-section--lists">
          <h3>Features & Amenities</h3>
          <div className="admin-field">
            <label className="admin-label">Project Features</label>
            <div className="admin-hint">Comma-separated</div>
            <textarea className="admin-textarea" value={form.featuresText}
              onChange={(e) => updateField("featuresText", e.target.value)} />
          </div>
          <div className="admin-field">
            <label className="admin-label">Amenities</label>
            <div className="admin-hint">Comma-separated</div>
            <textarea className="admin-textarea" value={form.amenitiesText}
              onChange={(e) => updateField("amenitiesText", e.target.value)} />
          </div>
        </div>

        <div className="admin-form-actions">
          <button className="admin-btn admin-btn--primary" onClick={saveProject}>
            {editId ? "Update Project" : "Save Project"}
          </button>
          {editId && (
            <button className="admin-btn admin-btn--ghost" onClick={resetForm}>
              Cancel Edit
            </button>
          )}
        </div>

        <hr className="admin-divider" />
        <h2 className="admin-list-title">Saved Projects</h2>

        {projects.length === 0 ? (
          <p className="admin-empty-state">No projects found.</p>
        ) : (
          projects.map((project) => (
            <div key={project._id} className="admin-project-card">
              <div className="admin-project-card-header">
                <h3 className="admin-project-title">
                  {project.title}
                  <span className={statusPillClass(project.status)}>
                    {project.status || "Ongoing"}
                  </span>
                </h3>
                <div className="admin-project-actions">
                  <button className="admin-btn--edit" onClick={() => startEdit(project)}>Edit</button>
                  <button className="admin-btn--danger" onClick={() => deleteProject(project._id)}>Delete</button>
                </div>
              </div>
              <p className="admin-project-meta"><strong>Location:</strong> {project.location}</p>
              <p className="admin-project-meta"><strong>Price:</strong> {project.price}</p>
              <p className="admin-project-meta"><strong>Description:</strong> {project.description}</p>
              {project.image && (
                <img className="admin-project-image" src={project.image} alt={project.title} />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminProjects;