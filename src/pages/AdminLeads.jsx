import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProjects.css";

const BASE = "https://dharukka-realty-fullstack-oh3s.onrender.com";

function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BASE}/api/visits`)
      .then((r) => r.json())
      .then((data) => setLeads(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this request?")) return;
    try {
      await fetch(`${BASE}/api/visits/${id}`, { method: "DELETE" });
      setLeads(leads.filter((l) => l._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleContacted = async (id) => {
    try {
      const res = await fetch(`${BASE}/api/visits/${id}/contacted`, { method: "PATCH" });
      const data = await res.json();
      setLeads(leads.map((l) =>
        l._id === id ? { ...l, contacted: data.contacted } : l
      ));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="admin-projects-page">
      <div className="admin-projects-inner" style={{ maxWidth: "960px" }}>

        {/* Navbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", paddingBottom: "16px", borderBottom: "1px solid var(--admin-border)" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="admin-btn admin-btn--ghost" style={{ marginLeft: 0 }} onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
            <button className="admin-btn admin-btn--ghost" onClick={() => navigate("/admin/projects")}>Projects</button>
            <button className="admin-btn admin-btn--ghost" onClick={() => navigate("/admin/inquiries")}>Inquiries</button>
          </div>
          <button className="admin-btn admin-btn--ghost" style={{ color: "var(--admin-danger)" }} onClick={logout}>Logout</button>
        </div>

        <h1 className="admin-page-title">Schedule Visit Requests</h1>
        <p style={{ color: "var(--admin-text-muted)", fontSize: "14px", marginBottom: "24px" }}>
          {leads.length} visit request{leads.length !== 1 ? "s" : ""} received
        </p>

        {loading && <p className="admin-empty-state">Loading...</p>}
        {!loading && leads.length === 0 && <p className="admin-empty-state">No visit requests yet.</p>}

        {!loading && leads.map((item, i) => (
          <div key={item._id || i} className="admin-project-card"
            style={{ borderLeft: `3px solid ${item.contacted ? "#2f8a72" : "#8a5fd6"}` }}>

            <div className="admin-project-card-header">
              <h3 className="admin-project-title" style={{ fontSize: "16px" }}>
                {item.fullName}
                <span className="admin-status-pill"
                  style={{ background: item.contacted ? "#eef6ec" : "#f3eeff", color: item.contacted ? "#2f6b32" : "#8a5fd6" }}>
                  {item.contacted ? "✓ Contacted" : item.property}
                </span>
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "12px", color: "var(--admin-text-muted)" }}>
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                </span>
                <button
                  onClick={() => toggleContacted(item._id)}
                  style={{ background: item.contacted ? "#eef6ec" : "transparent", border: `1px solid ${item.contacted ? "#2f8a72" : "var(--admin-border)"}`, color: item.contacted ? "#2f6b32" : "var(--admin-text-muted)", borderRadius: "6px", padding: "4px 10px", fontSize: "12px", cursor: "pointer" }}
                >
                  {item.contacted ? "✓ Contacted" : "Mark Contacted"}
                </button>
                <button
                  onClick={() => deleteLead(item._id)}
                  style={{ background: "none", border: "1px solid #f1d4d4", color: "#d64545", borderRadius: "6px", padding: "4px 10px", fontSize: "12px", cursor: "pointer" }}
                >
                  Delete
                </button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px", marginBottom: "10px" }}>
              <p className="admin-project-meta"><strong>Email:</strong> {item.email}</p>
              <p className="admin-project-meta"><strong>Phone:</strong> {item.phone}</p>
              <p className="admin-project-meta"><strong>Property:</strong> {item.property}</p>
            </div>

            <div style={{ background: "var(--admin-bg)", borderRadius: "var(--radius-sm)", padding: "10px 14px" }}>
              <p style={{ fontSize: "13px", color: "var(--admin-text-muted)", margin: "0 0 4px", fontWeight: "600" }}>MESSAGE</p>
              <p style={{ fontSize: "14px", color: "var(--admin-text)", margin: 0, lineHeight: "1.5" }}>{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminLeads;