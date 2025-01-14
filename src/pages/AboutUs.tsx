import '../styles/AboutUs.css';

function AboutUs() {
  return (
    <div className="about-container">
      <section className="team-section">
        <div className="team-content">
          <div className="content-box">
            <h2>The Developers</h2>
            <p>
              This website was created by a team of developers from the EDGE (Engineering and Design for Growth and Empowerment) club at Northville High School.
              This website is one of many projects we have created to make a tangible impact on our community through STEM.
            </p>
            <a href="https://northvilleedge.wixsite.com/northvilleedge" className="button-container" target="_blank" rel="noopener noreferrer">Visit our website!</a>
          </div>
          <div className="logo-box">
            <img src="/EDGE-Logo.svg" alt="EDGE Logo" className="edge-logo" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;