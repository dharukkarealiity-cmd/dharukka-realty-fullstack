import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProjects.css";

const API_URL = "https://dharukka-realty-fullstack-oh3s.onrender.com/api/visits";

function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((data) => setLeads(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="admin-projects-page">
      <div className="admin-projects-inner" style={{ maxWidth: "960px" }}>

        {/* Navbar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px", paddingBottom: "16px", borderBottom: "1px solid var(--admin-border)" }}>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="admin-btn admin-btn--ghost" onClick={() => navigate("/admin/dashboard")}>Dashboard</button>
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

        {!loading && leads.length === 0 && (
          <p className="admin-empty-state">No visit requests yet.</p>
        )}

        {!loading && leads.map((item, i) => (
          <div key={item._id || i} className="admin-project-card" style={{ borderLeft: "3px solid #8a5fd6" }}>
            <div className="admin-project-card-header">
              <h3 className="admin-project-title" style={{ fontSize: "16px" }}>
                {item.fullName}
                <span className="admin-status-pill" style={{ background: "#f3eeff", color: "#8a5fd6" }}>{item.property}</span>
              </h3>
              <span style={{ fontSize: "12px", color: "var(--admin-text-muted)" }}>
                {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—"}
              </span>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px 24px", marginBottom: "10px" }}>
              <p className="admin-project-meta"><strong>Email:</strong> {item.email}</p>
              <p className="admin-project-meta"><strong>Phone:</strong> {item.phone}</p>
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