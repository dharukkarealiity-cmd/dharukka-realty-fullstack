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
  Where Innovation
  <br />
  <span>Meets Infrastructure.</span>
</h2>

        <p className="about-desc">
          Dharukka Realiity creates premium residential spaces with thoughtful
          planning, quality construction and timeless design. Every project is
          built with trust, detail and long-term value for families.
        </p>

       <div className="about-cards">
  <div>
    <h4>Mission</h4>
    <p>To deliver premium residential spaces that families in Bhavnagar are proud to call home.</p>
  </div>

  <div>
    <h4>Vision</h4>
    <p>To be Bhavnagar's most trusted real estate developer known for quality and transparency.</p>
  </div>

  <div>
    <h4>Quality</h4>
    <p>Every plot and bungalow is built with the finest materials and highest construction standards.</p>
  </div>

  <div>
    <h4>Trust</h4>
    <p>Honest pricing, on-time delivery and zero hidden costs — always.</p>
  </div>

</div>
      </div>
    </section>
  );
}

export default About;