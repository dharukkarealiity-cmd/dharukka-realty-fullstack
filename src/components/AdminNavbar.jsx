import { useNavigate } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", marginBottom: "1rem", borderBottom: "1px solid #eee" }}>
      <div style={{ display: "flex", gap: "16px" }}>
        <button onClick={() => navigate("/admin/dashboard")} style={navBtn}>Dashboard</button>
        <button onClick={() => navigate("/admin/projects")} style={navBtn}>Projects</button>
        <button onClick={() => navigate("/admin/inquiries")} style={navBtn}>Inquiries</button>
        <button onClick={() => navigate("/admin/leads")} style={navBtn}>Leads</button>
      </div>
      <button onClick={logout} style={{ ...navBtn, color: "red" }}>Logout</button>
    </div>
  );
}

const navBtn = { background: "none", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: "500" };

export default AdminNavbar;