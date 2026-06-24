import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ProjectsPage.css";

const API_URL = "http://localhost:5001/api/projects";

// Builds a short checklist for a project card from real fields —
// only includes a line if the underlying data actually exists,
// so we never show fake/generic claims about a project.
function buildChecklist(project) {
  const items = [];

  if (project.typology) items.push(project.typology);
  if (project.projectType) items.push(project.projectType);

  if (project.amenities && project.amenities.length > 0) {
    items.push(`${project.amenities.length} Amenities Included`);
  }

  if (project.location) items.push(`Located in ${project.location}`);

  // Fallback so a card never shows an empty checklist
  if (items.length === 0) {
    items.push("Details Available on Request");
  }

  return items.slice(0, 4); // keep cards even, max 4 lines like the original
}

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(API_URL);
        setProjects(res.data);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="projects-page">
      <div className="projects-header">
        <p className="section-label">OUR PROJECTS</p>
        <h1>Explore Our Developments</h1>
        <p className="projects-desc">
          Premium homes thoughtfully designed with modern architecture,
          quality construction and family comfort.
        </p>
      </div>

      {loading && <p className="projects-status">Loading projects…</p>}

      {!loading && error && (
        <p className="projects-status">
          Couldn't load projects right now. Please try again shortly.
        </p>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="projects-status">No projects available yet.</p>
      )}

      {!loading &&
        !error &&
        projects.map((project) => (
          <div className="single-project-card" key={project._id}>
            <div className="project-image">
              <img
                src={project.image || "/placeholder-project.jpg"}
                alt={project.title}
              />
            </div>

            <div className="project-content">
              <span className="project-status">
                {(project.status || "ONGOING").toUpperCase()}
              </span>

              <h2>{project.title}</h2>

              {project.description && <p>{project.description}</p>}

              <ul>
                {buildChecklist(project).map((item, i) => (
                  <li key={i}>✓ {item}</li>
                ))}
              </ul>

              <Link to={`/project/${project._id}`} className="project-btn">
                View Details →
              </Link>
            </div>
          </div>
        ))}
    </section>
  );
}

export default ProjectsPage;