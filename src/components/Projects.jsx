import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Projects.css";

const API_URL = "https://dharukka-realty-fullstack-oh3s.onrender.com/api/projects";

function Projects() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(API_URL);
        // Show the first project in the list as the "featured" one.
        // (Most recently added shows first if your backend sorts that way —
        // otherwise this is just whichever comes first from the API.)
        if (res.data && res.data.length > 0) {
          setProject(res.data[0]);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  // Nothing to show yet (still loading, or no projects exist) —
  // render nothing rather than a broken/empty section
  if (loading || !project) return null;

  return (
    <section className="featured-project-section" id="projects">
      <div className="featured-header">
        <span>FEATURED {(project.status || "ONGOING").toUpperCase()} PROJECT</span>

        <h2>{project.title}</h2>

        {project.location && <p>📍 {project.location}</p>}
      </div>

      <div className="featured-project-card">
        <div className="featured-image">
          <img
            src={project.image || "/dharukka-premium-villas-hero.jpg"}
            alt={project.title}
          />
        </div>

        <div className="featured-content">
          <span className="status">● {(project.status || "ONGOING").toUpperCase()}</span>

          <h3>{project.title}</h3>

          <div className="gold-line"></div>

          {project.description && <p>{project.description}</p>}

          <div className="project-features">
            {project.typology && (
              <div className="feature">
                <h4>🏠</h4>
                <span>{project.typology}</span>
              </div>
            )}

            {project.location && (
              <div className="feature">
                <h4>📍</h4>
                <span>{project.location}</span>
              </div>
            )}

            <div className="feature">
              <h4>⭐</h4>
              <span>Premium Lifestyle</span>
            </div>
          </div>

          {/* Uses the project's real MongoDB _id, fixing the broken link */}
          <Link to={`/project/${project._id}`} className="view-project-btn">
            View Project →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Projects;