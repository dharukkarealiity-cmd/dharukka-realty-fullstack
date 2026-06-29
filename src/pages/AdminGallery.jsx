import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAuth.css";

const BASE = "https://dharukka-realty-fullstack-oh3s.onrender.com";
const CLOUD_NAME = "dox2zkbxi";
const UPLOAD_PRESET = "dharukka_gallery";

function AdminGallery() {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState(null);

  const fetchImages = async () => {
    const res = await fetch(`${BASE}/api/gallery`);
    const data = await res.json();
    setImages(data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image first.");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        { method: "POST", body: formData }
      );
      const cloudData = await cloudRes.json();
      console.log("Cloudinary response:", cloudData);

      if (!cloudData.secure_url) {
        alert("Cloudinary error: " + JSON.stringify(cloudData));
        return;
      }

      const url = cloudData.secure_url;

      const backendRes = await fetch(`${BASE}/api/gallery`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, caption }),
      });
      const backendData = await backendRes.json();
      console.log("Backend response:", backendData);

      setCaption("");
      setFile(null);
      document.getElementById("gallery-file-input").value = "";
      fetchImages();
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    await fetch(`${BASE}/api/gallery/${id}`, { method: "DELETE" });
    fetchImages();
  };

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-topbar">
        <span className="admin-dashboard-brand">DHARUKKA <span>ADMIN</span></span>
        <button className="admin-logout-btn" onClick={logout}>Logout</button>
      </div>

      <div className="admin-dashboard-content">
        <div style={{ marginBottom: "1rem" }}>
          <button onClick={() => navigate("/admin/dashboard")}
            style={{ background: "none", border: "1px solid #ccc", padding: "0.4rem 1rem", borderRadius: "6px", cursor: "pointer" }}>
            ← Back to Dashboard
          </button>
        </div>

        <h1 className="admin-dashboard-title">Gallery</h1>
        <p className="admin-dashboard-subtitle">Upload and manage homepage gallery images.</p>

        <div className="admin-dashboard-card" style={{ display: "block", cursor: "default", marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>Upload New Image</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", maxWidth: "500px" }}>
            <input
              id="gallery-file-input"
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              style={{ padding: "0.4rem", border: "1px solid #ccc", borderRadius: "6px" }}
            />
            <input
              type="text"
              placeholder="Caption (optional)"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "6px", fontSize: "0.95rem" }}
            />
            <button
              onClick={handleUpload}
              disabled={uploading}
              style={{ padding: "0.5rem 1.5rem", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", width: "fit-content" }}>
              {uploading ? "Uploading..." : "Upload Image"}
            </button>
          </div>
        </div>

        <h3 style={{ marginBottom: "1rem" }}>Uploaded Images ({images.length})</h3>
        {images.length === 0 ? (
          <p style={{ color: "#888" }}>No images uploaded yet.</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
            {images.map((img) => (
              <div key={img._id} style={{ border: "1px solid #eee", borderRadius: "8px", overflow: "hidden" }}>
                <img src={img.url} alt={img.caption || "Gallery"} style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} />
                <div style={{ padding: "0.5rem" }}>
                  {img.caption && <p style={{ fontSize: "0.85rem", color: "#555", marginBottom: "0.5rem" }}>{img.caption}</p>}
                  <button
                    onClick={() => handleDelete(img._id)}
                    style={{ padding: "0.3rem 0.8rem", background: "#e53e3e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem" }}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminGallery;
