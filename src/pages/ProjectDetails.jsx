import { Link } from "react-router-dom";
import { useState } from "react";
import "./ProjectDetails.css";

function ProjectDetails() {
  const [loading, setLoading] = useState(false);

  const handleInquirySubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = {
      firstName: form.fullName.value,
      lastName: "",
      email: form.email.value,
      phone: form.phone.value,
      interest: "Rameshvar Bunglow",
      message: form.message.value,
    };

    try {
      setLoading(true);

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
      setLoading(false);
    }
  };

  return (
    <main className="pd-page">
      {/* HERO */}
      <section
        className="pd-hero"
        style={{ backgroundImage: "url('/dharukka-premium-villas-hero.jpg')" }}
      >
        <div className="pd-overlay"></div>

        <div className="pd-hero-content">
          <Link to="/projects" className="pd-back">
            ← All Projects
          </Link>

          <p className="pd-status-line">
            <span className="status-pill">ONGOING</span>
            <span>RESIDENTIAL PROJECT</span>
          </p>

          <h1>Rameshvar Bunglow</h1>

          <h4>
            Thoughtfully designed 1, 2 & 3 BHK homes crafted for peaceful,
            comfortable and modern family living.
          </h4>

          <span className="pd-location">⌖ Akvada, Bhavnagar, Gujarat</span>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="pd-overview-new">
        <div>
          <p className="pd-label">OVERVIEW</p>

          <h2>A perfect blend of comfort, quality & community living.</h2>

          <p className="pd-desc">
            Rameshvar Bunglow is an ongoing residential project offering
            well-planned 1, 2 & 3 BHK tenements with modern architecture,
            quality construction, and essential amenities designed for peaceful
            family living.
          </p>
        </div>

        <div className="pd-info-grid">
          <div>
            <span>Status</span>
            <strong>Ongoing</strong>
          </div>

          <div>
            <span>Typology</span>
            <strong>1, 2 & 3 BHK Tenements</strong>
          </div>

          <div>
            <span>Location</span>
            <strong>Akvada, Bhavnagar</strong>
          </div>

          <div>
            <span>Project Type</span>
            <strong>Residential</strong>
          </div>

          <div>
            <span>Completion</span>
            <strong>2026–27</strong>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="pd-gallery-new">
  <div className="pd-gallery-header">
    <p className="pd-label">GALLERY</p>
    <h2>Explore the project in detail.</h2>
  </div>

  <div className="pd-gallery-three">
    <div className="gallery-card">
      <div className="gallery-image building-image">
        <img src="/rameshvar-front-elevation.jpg" alt="Front Elevation" />
      </div>
      <div className="gallery-caption">
        <h4>Front Elevation</h4>
      </div>
    </div>

    <div className="gallery-card">
      <div className="gallery-image layout-image">
        <img src="/rameshvar-3d-layout-view.jpg" alt="3D Layout View" />
      </div>
      <div className="gallery-caption">
        <h4>3D Layout View</h4>
      </div>
    </div>

    <div className="gallery-card">
      <div className="gallery-image master-image">
        <img src="/rameshvar-master-layout-plan.jpg" alt="Master Layout Plan" />
      </div>
      <div className="gallery-caption">
        <h4>Master Layout Plan</h4>
      </div>
    </div>
  </div>
</section>
      {/* PROMISE SECTION */}
      <section className="pd-promises-section">
        <div className="pd-promises-header">
          <p className="pd-label">OUR PROMISE</p>
          <h2>Built on trust, quality and complete transparency.</h2>
        </div>

        <div className="pd-promises-grid">
          <div className="pd-promise-card">
            <ul>
              <li>We believe every customer is like family.</li>
              <li>We work with complete honesty and transparency.</li>
              <li>No compromise in quality or quantity.</li>
              <li>Customer benefit and satisfaction is our priority.</li>
              <li>No hidden charges after final rate discussion.</li>
              <li>We use only premium quality materials.</li>
              <li>Proper guidance is given to every customer.</li>
            </ul>
          </div>

          <div className="pd-promise-card">
            <ul>
              <li>Regular project updates are shared with customers.</li>
              <li>We complete work with commitment and responsibility.</li>
              <li>Every issue is solved quickly and professionally.</li>
              <li>Timely possession and proper reporting.</li>
              <li>Long-term relationship with customers matters most.</li>
              <li>ISI-mark quality materials are used.</li>
              <li>Peaceful living environment with quality planning.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* KEY PLAN + CONTACT */}
      <section className="pd-keyplan-section">
        <div className="pd-keyplan-left">
          <p className="pd-label">KEY PLAN</p>
          <h2>Easy access, peaceful surroundings and a growing location.</h2>

          <div className="pd-keyplan-card">
            <img src="/rameshvar-key-plan.jpg" alt="Rameshvar Key Plan" />
          </div>
        </div>

        <div className="pd-keyplan-right">
          <div className="pd-detail-box">
            <span>Site Address</span>
            <h3>
              Shri Swaminarayan Gurukul, Akvada, Bhavnagar, Gujarat.
            </h3>
          </div>

          <div className="pd-detail-box">
            <span>Developer Contact</span>
            <h3>Jatinbhai: +91 76219 01901</h3>
            <h3>Nileshbhai: +91 96626 49333</h3>
          </div>

          <div className="pd-highlight-box">
            <h3>Why choose Rameshvar Bunglow?</h3>

            <ul>
              <li>Trusted developer</li>
              <li>Premium construction quality</li>
              <li>Peaceful and safe environment</li>
              <li>Prime developing location</li>
              <li>Excellent value for investment</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="pd-features-new">
        <div>
          <p className="pd-label">PROJECT HIGHLIGHTS</p>

          <h2>
            Built for today.
            <br />
            Designed for tomorrow.
          </h2>

          <ul>
            <li>Modern and elegant architecture</li>
            <li>Well-planned 1, 2 & 3 BHK homes</li>
            <li>Quality construction with premium materials</li>
            <li>Private parking for every home</li>
            <li>Spacious rooms with excellent ventilation</li>
            <li>Peaceful environment for families</li>
          </ul>
        </div>

        <div>
          <p className="pd-label">AMENITIES</p>

          <h2>
            All the essentials,
            <br />
            thoughtfully included.
          </h2>

          <div className="pd-amenities-new">
            <span>Internal Roads</span>
            <span>Common Plot</span>
            <span>24×7 Security</span>
            <span>Children Play Area</span>
            <span>Street Lighting</span>
            <span>Landscaped Garden</span>
            <span>Water Supply</span>
            <span>Private Terrace</span>
          </div>
        </div>
      </section>

      {/* INQUIRY */}
      <section className="pd-inquire-dark">
        <div>
          <p className="pd-label">INQUIRE</p>

          <h2>
            Request a private
            <br />
            walkthrough of
            <br />
            Rameshvar Bunglow.
          </h2>

          <p className="pd-inquire-note">
            Our team will be in touch within 24 hours.
          </p>

          <div className="pd-buttons">
            <a href="tel:+917621901901">CALL NOW</a>

            <a
              href="https://wa.me/917621901901"
              target="_blank"
              rel="noreferrer"
            >
              WHATSAPP
            </a>
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

          <button type="submit" disabled={loading}>
            {loading ? "SENDING..." : "REQUEST INVITATION"}
          </button>
        </form>
      </section>
    </main>
  );
}

export default ProjectDetails;