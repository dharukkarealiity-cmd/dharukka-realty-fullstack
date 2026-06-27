import "./AboutPage.css";
import { Link } from "react-router-dom";

function AboutPage() {
  const stats = [
    ["5+", "YEARS OF EXPERIENCE"],
    ["42+", "PROJECTS DELIVERED"],
    ["250+", "FAMILIES SERVED"],
    ["105000 Sq ft+", "SQ. FT. DELIVERED"],
  ];

  const trustItems = [
    {
      icon: "⌂",
      title: "Quality Construction",
      desc: "Built with the best materials and modern construction practices.",
    },
    {
      icon: "□",
      title: "Transparent Process",
      desc: "Clear communication at every step keeps you informed and confident.",
    },
    {
      icon: "⌖",
      title: "Prime Locations",
      desc: "Carefully selected locations for better connectivity and value.",
    },
    {
      icon: "◷",
      title: "Timely Delivery",
      desc: "We respect your time and deliver what we promise, always.",
    },
  ];

  const journey = [
    ["2019", "Founded in Bhavnagar", "With a vision to create quality homes and lasting relationships in Gujarat."],
    ["2021", "First Premium Project", "Delivered our first premium residence with commitment to excellence."],
    ["2023", "Growing Community", "More families served with better plots and modern residential spaces."],
    ["2025", "The Next Chapter", "Continuing to build better communities for generations in Bhavnagar."],
  ];

  return (
    <main className="about-page">
      <section className="about-intro">
        <p className="about-label">OUR STORY</p>

        <h1>
          5 Years of Building <br />
          Homes <span>Gujarat Trusts.</span>
        </h1>

        <div className="gold-line"></div>

        <p className="about-desc">
          Dharukka Realiity has been creating premium living spaces that combine
          quality construction, thoughtful design and long-term value. Homes
          that families are proud to own and pass on.
        </p>

        <div className="about-stats">
          {stats.map((item, index) => (
            <div key={index}>
              <h3>{item[0]}</h3>
              <p>{item[1]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="trust-showcase">
        <div className="trust-image-box">
          <img src="/about.jpg" alt="Dharukka Realty" />

          <div className="trust-floating-box">
            <h3>5+</h3>
            <p>Years of trusted construction</p>
          </div>
        </div>

        <div className="trust-content-box">
          <p className="about-label">WHY FAMILIES TRUST US</p>

          {trustItems.map((item, index) => (
            <div className="trust-row" key={index}>
              <span>0{index + 1}</span>

              <div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="journey-card">
        <div className="journey-heading">
          <p className="about-label">OUR JOURNEY</p>
          <h2>
            A Journey of <br />
            Growth & Trust.
          </h2>
        </div>

        {journey.map((item, index) => (
          <div className="journey-item" key={index}>
            <span className="journey-year">{item[0]}</span>
            <h4>{item[1]}</h4>
            <p>{item[2]}</p>
          </div>
        ))}
      </section>

      <section className="about-visit">
        <div>
          <h2>
            Ready to visit <br />
            Rameshwar Bungalow?
          </h2>
          <p>
            Experience the craftsmanship, quality and attention to detail in
            person.
          </p>
        </div>

        <Link to="/schedule-visit">SCHEDULE A VISIT →</Link>
      </section>
    </main>
  );
}

export default AboutPage;