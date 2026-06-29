import "./Stats.css";

function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-inner">
        <div className="stats-heading">
  <p>BY THE NUMBERS</p>
  <h2>One uncompromising standard.</h2>
</div>

        <div className="stats-grid">
          <div className="stat">
            <h3>42+</h3>
            <div className="stat-line"></div>
            <p>Projects Completed</p>
          </div>

          <div className="stat">
            <h3>9</h3>
            <div className="stat-line"></div>
            <p>Projects Ongoing</p>
          </div>

          <div className="stat">
            <h3>26</h3>
            <div className="stat-line"></div>
            <p>Years of Experience</p>
          </div>

          <div className="stat">
            <h3>250+</h3>
            <div className="stat-line"></div>
            <p>Happy Families</p>
          </div>

          <div className="stat">
            <h3>105000 Sq ft</h3>
            <div className="stat-line"></div>
            <p>Sq Ft Delivered</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Stats;