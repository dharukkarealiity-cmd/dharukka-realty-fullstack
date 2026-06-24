import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./ProjectDetails.css";

const API_URL = "https://dharukka-realty-fullstack-oh3s.onrender.com/api/projects";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        const res = await axios.get(`${API_URL}/${id}`);
        setProject(res.data);
      } catch (error) {
        console.log(error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = {
      firstName: form.fullName.value,
      lastName: "",
      email: form.email.value,
      phone: form.phone.value,
      interest: project?.title || "General Inquiry",
      message: form.message.value,
    };

    try {
      setFormLoading(true);

      const res = await fetch(
        "https://dharukka-realty-fullstack-oh3s.onrender.com/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (res.ok) {
        alert("Invitation request sent successfully!");
        form.reset();
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      alert("Server error. Please try again.");
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="pd-page">
        <div className="pd-loading">Loading project…</div>
      </main>
    );
  }

  if (notFound || !project) {
    return (
      <main className="pd-page">
        <div className="pd-loading">
          <p>We couldn't find this project.</p>
          <Link to="/projects" className="pd-back">
            ← All Projects
          </Link>
        </div>
      </main>
    );
  }

  // Pull fields with sensible fallbacks so missing data never breaks layout
  const {
    title,
    location,
    description,
    image,
    status,
    typology,
    projectType,
    completionDate,
    gallery,
    keyPlanImage,
    siteAddress,
    contacts,
    promisesColumn1,
    promisesColumn2,
    highlights,
    features,
    amenities,
  } = project;

  return (
    <main className="pd-page">
      {/* HERO */}
      <section
        className="pd-hero"
        style={{ backgroundImage: `url('${image || "/placeholder-project.jpg"}')` }}
      >
        <div className="pd-overlay"></div>

        <div className="pd-hero-content">
          <Link to="/projects" className="pd-back">
            ← All Projects
          </Link>

          <p className="pd-status-line">
            <span className="status-pill">{status || "Ongoing"}</span>
            {projectType && <span>{projectType.toUpperCase()} PROJECT</span>}
          </p>

          <h1>{title}</h1>

          {description && <h4>{description}</h4>}

          {location && <span className="pd-location">⌖ {location}</span>}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="pd-overview-new">
        <div>
          <p className="pd-label">OVERVIEW</p>

          <h2>A perfect blend of comfort, quality & community living.</h2>

          {description && <p className="pd-desc">{description}</p>}
        </div>

        <div className="pd-info-grid">
          <div>
            <span>Status</span>
            <strong>{status || "—"}</strong>
          </div>

          <div>
            <span>Typology</span>
            <strong>{typology || "—"}</strong>
          </div>

          <div>
            <span>Location</span>
            <strong>{location || "—"}</strong>
          </div>

          <div>
            <span>Project Type</span>
            <strong>{projectType || "—"}</strong>
          </div>

          <div>
            <span>Completion</span>
            <strong>{completionDate || "—"}</strong>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      {gallery && gallery.length > 0 && (
        <section className="pd-gallery-new">
          <div className="pd-gallery-header">
            <p className="pd-label">GALLERY</p>
            <h2>Explore the project in detail.</h2>
          </div>

          <div className="pd-gallery-three">
            {gallery.map((item, index) => (
              <div className="gallery-card" key={index}>
                <div className="gallery-image">
                  <img src={item.url} alt={item.caption || title} />
                </div>
                {item.caption && (
                  <div className="gallery-caption">
                    <h4>{item.caption}</h4>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROMISE SECTION */}
      {(promisesColumn1?.length > 0 || promisesColumn2?.length > 0) && (
        <section className="pd-promises-section">
          <div className="pd-promises-header">
            <p className="pd-label">OUR PROMISE</p>
            <h2>Built on trust, quality and complete transparency.</h2>
          </div>

          <div className="pd-promises-grid">
            {promisesColumn1?.length > 0 && (
              <div className="pd-promise-card">
                <ul>
                  {promisesColumn1.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {promisesColumn2?.length > 0 && (
              <div className="pd-promise-card">
                <ul>
                  {promisesColumn2.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* KEY PLAN + CONTACT */}
      {(keyPlanImage || siteAddress || contacts?.length > 0 || highlights?.length > 0) && (
        <section className="pd-keyplan-section">
          <div className="pd-keyplan-left">
            <p className="pd-label">KEY PLAN</p>
            <h2>Easy access, peaceful surroundings and a growing location.</h2>

            {keyPlanImage && (
              <div className="pd-keyplan-card">
                <img src={keyPlanImage} alt={`${title} Key Plan`} />
              </div>
            )}
          </div>

          <div className="pd-keyplan-right">
            {siteAddress && (
              <div className="pd-detail-box">
                <span>Site Address</span>
                <h3>{siteAddress}</h3>
              </div>
            )}

            {contacts?.length > 0 && (
              <div className="pd-detail-box">
                <span>Developer Contact</span>
                {contacts.map((c, i) => (
                  <h3 key={i}>
                    {c.name}: {c.phone}
                  </h3>
                ))}
              </div>
            )}

            {highlights?.length > 0 && (
              <div className="pd-highlight-box">
                <h3>Why choose {title}?</h3>
                <ul>
                  {highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* FEATURES */}
      {(features?.length > 0 || amenities?.length > 0) && (
        <section className="pd-features-new">
          {features?.length > 0 && (
            <div>
              <p className="pd-label">PROJECT HIGHLIGHTS</p>
              <h2>
                Built for today.
                <br />
                Designed for tomorrow.
              </h2>
              <ul>
                {features.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {amenities?.length > 0 && (
            <div>
              <p className="pd-label">AMENITIES</p>
              <h2>
                All the essentials,
                <br />
                thoughtfully included.
              </h2>
              <div className="pd-amenities-new">
                {amenities.map((item, i) => (
                  <span key={i}>{item}</span>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* INQUIRY */}
      <section className="pd-inquire-dark">
        <div>
          <p className="pd-label">INQUIRE</p>

          <h2>
            Request a private
            <br />
            walkthrough of
            <br />
            {title}.
          </h2>

          <p className="pd-inquire-note">
            Our team will be in touch within 24 hours.
          </p>

          <div className="pd-buttons">
            {contacts?.[0]?.phone && (
              <>
                <a href={`tel:${contacts[0].phone.replace(/\s/g, "")}`}>
                  CALL NOW
                </a>
                <a
                  href={`https://wa.me/${contacts[0].phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  WHATSAPP
                </a>
              </>
            )}
          </div>
        </div>

        <form className="pd-form-dark" onSubmit={handleInquirySubmit}>
          <div className="pd-form-row">
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
            />
          </div>

          <input type="tel" name="phone" placeholder="Phone number" required />

          <textarea
            name="message"
            placeholder="Tell us about your requirement"
            required
          ></textarea>

          <button type="submit" disabled={formLoading}>
            {formLoading ? "SENDING..." : "REQUEST INVITATION"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default ProjectDetails;