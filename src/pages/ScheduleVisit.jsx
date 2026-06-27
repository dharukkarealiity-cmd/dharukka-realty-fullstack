import { useState, useEffect } from "react";
import "./ScheduleVisit.css";

const BASE = "https://dharukka-realty-fullstack-oh3s.onrender.com";

function ScheduleVisit() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    property: "",
    message: "",
  });

  useEffect(() => {
    fetch(`${BASE}/api/projects`)
      .then((r) => r.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE}/api/visit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Visit booked successfully!");
        setFormData({ fullName: "", email: "", phone: "", property: "", message: "" });
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      alert("Server error. Please check backend.");
    }
  };

  return (
    <div className="visit-page">
      <div className="visit-form-box">
        <h1>Schedule a Visit</h1>
        <p className="visit-subtitle">Schedule a private site visit with our team.</p>

        <form onSubmit={handleSubmit}>
          <input type="text" name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />

          <select name="property" value={formData.property} onChange={handleChange} required>
            <option value="" disabled>Select Property</option>
            {projects.map((p) => (
              <option key={p._id} value={p.title}>{p.title}</option>
            ))}
          </select>

          <textarea name="message" placeholder="Tell us your preferred date and requirements" value={formData.message} onChange={handleChange} required></textarea>

          <button type="submit">BOOK VISIT</button>
        </form>
      </div>
    </div>
  );
}

export default ScheduleVisit;