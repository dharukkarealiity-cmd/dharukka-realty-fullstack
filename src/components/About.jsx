import "./About.css";

function About() {
  return (
    <section className="about-section">
      <div className="about-image">
        <img src="/about-realistic.jpg" alt="Dharukka Realiity Design" />
        <div className="about-badge">
          <h3>5+</h3>
          <p>Years of Experience</p>
        </div>
      </div>

      <div className="about-content">
        <p className="about-label">WHO WE ARE</p>

        <h2>
          Creating landmarks.
          <br />
          <span>Building trust.</span>
        </h2>

        <p className="about-desc">
          Dharukka Realiity creates premium residential spaces with thoughtful
          planning, quality construction and timeless design. Every project is
          built with trust, detail and long-term value for families.
        </p>

       <div className="about-cards">
  <div>
    <h4>Legacy</h4>
    <p>5+ years of building premium residential spaces families are proud to call home.</p>
  </div>

  <div>
    <h4>Location</h4>
    <p>Prime plots in Bhavnagar's fastest growing and most peaceful neighbourhoods.</p>
  </div>

  <div>
    <h4>Promise</h4>
    <p>Honest pricing, on-time delivery and zero hidden costs — always.</p>
  </div>

  <div>
    <h4>Craftsmanship</h4>
    <p>Every detail is built with premium materials and the highest standards of care.</p>
  </div>
</div>
      </div>
    </section>
  );
}

export default About;