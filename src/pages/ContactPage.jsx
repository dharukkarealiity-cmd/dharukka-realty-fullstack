import { useState, useEffect } from "react";
import "./ContactPage.css";

const BASE = "https://dharukka-realty-fullstack-oh3s.onrender.com";

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("Loading...");

  useEffect(() => {
    fetch(`${BASE}/api/settings`)
      .then((r) => r.json())
      .then((data) => setAddress(data.address || ""))
      .catch(() => setAddress(""));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.email.value,
      phone: form.phone.value,
      interest: form.interest.value,
      message: form.message.value,
    };
    try {
      setLoading(true);
      const res = await fetch(`${BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) { alert("Inquiry sent successfully!"); form.reset(); }
      else alert(data.message || "Something went wrong.");
    } catch (error) {
      alert("Server error. Please check backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-container">
        <div className="contact-left">
          <p className="contact-label">CONCIERGE</p>
          <h1>
            Let's Talk About<br />Your Dream<br /><span>Property.</span>
          </h1>
          <p className="contact-desc">
            Whether you are looking for a home, investment or partnership, our team will contact you soon.
          </p>
          <div className="contact-info">
            <div>
              <h4>VISIT</h4>
              <p>{address}</p>
            </div>
            <div>
              <h4>CALL</h4>
              <p>Jaytibhai: +91 76219 01901<br />Timalbhai: +91 96626 49333</p>
            </div>
            <div>
              <h4>EMAIL</h4>
              <p>info@dharukkareality.com</p>
            </div>
            <div>
              <h4>HOURS</h4>
              <p>Mon–Sat · 10:00 AM to 7:00 PM IST</p>
            </div>
          </div>
        </div>

        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit}>
            <h2>Get in Touch</h2>
            <p>Fill out the form and our team will get back to you within 24 hours.</p>
            <div className="form-row">
              <input type="text" name="firstName" placeholder="First name" required />
              <input type="text" name="lastName" placeholder="Last name" required />
            </div>
            <input type="email" name="email" placeholder="Email address" required />
            <input type="tel" name="phone" placeholder="Phone number" required />
            <select name="interest" defaultValue="" required>
              <option value="" disabled>I'm interested in...</option>
              <option value="Residential Plot">Residential Plot</option>
              <option value="Property Visit">Property Visit</option>
              <option value="Investment">Investment</option>
            </select>
            <textarea name="message" placeholder="Tell us about your requirement" required />
            <button type="submit" disabled={loading}>
              {loading ? "SENDING..." : "SEND INQUIRY →"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;