import '../styles/AboutUsStyle.css';

function AboutUs() {
  return (
    <div className="about-container">
      <section className="about-header">
        <h1>About Us</h1>
      </section>

      <section className="mission-section">
        <div className="content-box">
          <h2>Our Mission</h2>
          <p>
            At Mustang Scholar, we're dedicated to helping high school students navigate their academic journey 
            with confidence. Our platform simplifies the process of discovering courses and clubs, making it 
            easier for students to make informed decisions about their education and extracurricular activities.
          </p>
        </div>
      </section>

      <section className="team-section">
        <div className="team-content">
          <div className="content-box">
            <h2>The Developers</h2>
            <p>
              This website was created by a team of developers from the EDGE club at Northville High School.
              Our goal was to provide a resource that would help students explore their interests and plan
              for their future. We hope you find this website helpful and informative!
            </p>
            <a href="https://northvilleedge.wixsite.com/northvilleedge" className="button-container" target="_blank" rel="noopener noreferrer">Visit our website!</a>
          </div>
          <div className="logo-box">
            <img src="/EDGE-Logo.svg" alt="EDGE Logo" className="edge-logo" />
          </div>
        </div>
      </section>

      <section className="vision-section">
        <div className="content-box">
          <h2>Our Vision</h2>
          <p>
            We envision a future where every student has access to clear, organized information about their 
            educational opportunities. By providing a user-friendly platform for course and club exploration, 
            we aim to empower students to make choices that align with their interests and goals.
          </p>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;