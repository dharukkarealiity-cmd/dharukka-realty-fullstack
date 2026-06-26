import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminAuth.css";

const BASE = "https://dharukka-realty-fullstack-oh3s.onrender.com";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ projects: 0, leads: 0, inquiries: 0 });
  const [address, setAddress] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [p, l, i] = await Promise.all([
          fetch(`${BASE}/api/projects`).then(r => r.json()),
          fetch(`${BASE}/api/visits`).then(r => r.json()),
          fetch(`${BASE}/api/contacts`).then(r => r.json()),
        ]);
        setStats({ projects: p.length, leads: l.length, inquiries: i.length });
      } catch (err) { console.error(err); }
    };

    const fetchAddress = async () => {
      try {
        const res = await fetch(`${BASE}/api/settings`);
        const data = await res.json();
        setAddress(data.address || "");
        setEditAddress(data.address || "");
      } catch (err) { console.error(err); }
    };

    fetchStats();
    fetchAddress();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const saveAddress = async () => {
    setSaving(true);
    try {
      const res = await fetch(`${BASE}/api/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: editAddress }),
      });
      const data = await res.json();
      setAddress(data.address);
      setEditing(false);
      alert("Address updated successfully!");
    } catch (err) {
      alert("Failed to save address.");
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { to: "/admin/projects", icon: "🏗️", title: "Projects", description: "Add, edit and manage property listings", count: stats.projects, label: "total projects" },
    { to: "/admin/leads", icon: "📋", title: "Leads", description: "View Schedule Visit requests", count: stats.leads, label: "visit requests" },
    { to: "/admin/inquiries", icon: "✉️", title: "Inquiries", description: "View Contact form submissions", count: stats.inquiries, label: "inquiries" },
  ];

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-topbar">
        <span className="admin-dashboard-brand">DHARUKKA <span>ADMIN</span></span>
        <button className="admin-logout-btn" onClick={logout}>Logout</button>
      </div>

      <div className="admin-dashboard-content">
        <h1 className="admin-dashboard-title">Dashboard</h1>
        <p className="admin-dashboard-subtitle">Manage your site's projects, leads, and inquiries.</p>

        <div className="admin-dashboard-grid">
          {sections.map((section) => (
            <Link key={section.to} to={section.to} className="admin-dashboard-card">
              <span className="admin-dashboard-card-icon">{section.icon}</span>
              <div className="admin-dashboard-card-count">{section.count}<span>{section.label}</span></div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </Link>
          ))}
        </div>

        {/* Address Settings */}
        <div className="admin-dashboard-card" style={{ marginTop: "2rem", display: "block", cursor: "default" }}>
          <span className="admin-dashboard-card-icon">📍</span>
          <h3>Site Address</h3>
          <p>This address shows on the Footer and Contact page.</p>
          {editing ? (
            <div style={{ marginTop: "1rem" }}>
              <textarea
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                rows={3}
                style={{ width: "100%", padding: "0.5rem", fontSize: "0.95rem", borderRadius: "6px", border: "1px solid #ccc" }}
              />
              <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
                <button onClick={saveAddress} disabled={saving} style={{ padding: "0.4rem 1rem", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                  {saving ? "Saving..." : "Save"}
                </button>
                <button onClick={() => { setEditing(false); setEditAddress(address); }} style={{ padding: "0.4rem 1rem", background: "#ccc", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div style={{ marginTop: "1rem" }}>
              <p style={{ fontWeight: "500" }}>{address || "No address set"}</p>
              <button onClick={() => setEditing(true)} style={{ marginTop: "0.5rem", padding: "0.4rem 1rem", background: "#1a1a1a", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" }}>
                Edit Address
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;