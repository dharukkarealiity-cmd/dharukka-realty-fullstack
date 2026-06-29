import "./Footer.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const BASE = "https://dharukka-realty-fullstack-oh3s.onrender.com";

function Footer() {
  const [address, setAddress] = useState("Loading...");

  useEffect(() => {
    fetch(`${BASE}/api/settings`)
      .then((r) => r.json())
      .then((data) => setAddress(data.address || ""))
      .catch(() => setAddress(""));
  }, []);

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <img className="footer-logo" src="/logo.png" alt="Dharukka Realiity" />
         <h2>
  Where Innovation <span>Meets</span>
  <br />
  <span>Infrastructure.</span>
</h2>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">◎</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">in</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">▻</a>
          </div>
        </div>

        <div className="footer-links">
          <p>EXPLORE</p>
          <Link to="/projects">All Projects</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-contact">
          <p>GET IN TOUCH</p>
          <span>⌖ {address}</span>
          <span>☎ +91 7621901901</span>
          <span>✉ dharukkarealiity@gmail.com</span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Dharukka Realiity. All rights reserved.</span>
       
      </div>
    </footer>
  );
}

export default Footer;