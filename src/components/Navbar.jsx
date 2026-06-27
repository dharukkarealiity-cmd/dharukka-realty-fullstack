import { useEffect, useState } from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="logo-container" onClick={() => setOpen(false)}>
        <img src="/logo.png" alt="Dharukka Realiity" />
      </Link>

      <button className="menu-icon" onClick={() => setOpen(!open)}>
        {open ? "×" : "☰"}
      </button>

      <div className={`nav-links ${open ? "show" : ""}`}>
        <NavLink to="/" end onClick={() => setOpen(false)}>Home</NavLink>
        <NavLink to="/projects" onClick={() => setOpen(false)}>Projects</NavLink>
        <NavLink to="/about" onClick={() => setOpen(false)}>About</NavLink>
        <NavLink to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

        <NavLink
          to="/schedule-visit"
          className="mobile-visit-btn"
          onClick={() => setOpen(false)}
        >
          Schedule a Visit
        </NavLink>
      </div>

      <NavLink to="/schedule-visit" className="visit-btn">
        Schedule a Visit
      </NavLink>
    </nav>
  );
}

export default Navbar;