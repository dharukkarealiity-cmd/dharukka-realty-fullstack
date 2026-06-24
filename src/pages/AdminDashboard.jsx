import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminAuth.css";

const BASE = "https://dharukka-realty-fullstack-oh3s.onrender.com";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ projects: 0, leads: 0, inquiries: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [p, l, i] = await Promise.all([
          fetch(`https://dharukka-realty-fullstack-oh3s.onrender.com/api/projects`).then(r => r.json()),
          fetch(`${BASE}/api/visits`).then(r => r.json()),
          fetch(`${BASE}/api/contacts`).then(r => r.json()),
        ]);
        setStats({
          projects: p.length,
          leads: l.length,
          inquiries: i.length,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const sections = [
    {
      to: "/admin/projects",
      icon: "🏗️",
      title: "Projects",
      description: "Add, edit and manage property listings",
      count: stats.projects,
      label: "total projects",
    },
    {
      to: "/admin/leads",
      icon: "📋",
      title: "Leads",
      description: "View Schedule Visit requests",
      count: stats.leads,
      label: "visit requests",
    },
    {
      to: "/admin/inquiries",
      icon: "✉️",
      title: "Inquiries",
      description: "View Contact form submissions",
      count: stats.inquiries,
      label: "inquiries",
    },
  ];

  return (
    <div className="admin-dashboard-page">
      <div className="admin-dashboard-topbar">
        <span className="admin-dashboard-brand">
          DHARUKKA <span>ADMIN</span>
        </span>
        <button className="admin-logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="admin-dashboard-content">
        <h1 className="admin-dashboard-title">Dashboard</h1>
        <p className="admin-dashboard-subtitle">
          Manage your site's projects, leads, and inquiries.
        </p>

        <div className="admin-dashboard-grid">
          {sections.map((section) => (
            <Link
              key={section.to}
              to={section.to}
              className="admin-dashboard-card"
            >
              <span className="admin-dashboard-card-icon">{section.icon}</span>
              <div className="admin-dashboard-card-count">
                {section.count}
                <span>{section.label}</span>
              </div>
              <h3>{section.title}</h3>
              <p>{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;