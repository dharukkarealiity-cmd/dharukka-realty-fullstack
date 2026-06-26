import "./Hero.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="hero"
      style={{
        backgroundImage: "url('/hero-luxury-villa.jpg')",
      }}
    >
      <div className="hero-content">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-small"
        >
          DHARUKKA REALTY
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Premium Living.
          <br />
          <span>Built For Generations.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="hero-desc"
        >
          Creating landmark residences with timeless architecture, luxury
          finishes and exceptional lifestyle experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="hero-buttons"
        >
          <Link to="/projects" className="explore-btn">
            Explore Projects
          </Link>

          <Link to="/schedule-visit" className="consult-btn">
            Schedule Visit
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="hero-stats"
        >

          <div className="hero-tags">
  <span>5+ Years Experience</span>
  <span>250+ Happy Families</span>
  <span>10+ Premium Projects</span>
</div>
         
 
        </motion.div>
      </div>

      <div className="scroll-indicator">Scroll</div>
    </section>
  );
}

export default Hero;