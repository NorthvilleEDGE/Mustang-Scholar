import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="homeHeader">
        <h1>Introducing</h1>
        <h1 className="gradientText" style={{ fontSize: '80px' }}>MUSTANG SCHOLAR</h1>
        <h2>NHS course & club recommender made for students, by students.</h2>
      </div>
      <section className="description-section">
        <div className="content-box">
          <p>
            High school can be overwhelming, especially when navigating long, complicated course catalogs 
            and trying to make sense of all the available options. That's where we come in. Our website 
            streamlines the process by organizing course & club information into a simple, user-friendly format.
          </p>
            <Link to="/planner" className="action-button">
              Get Started
            </Link>
        </div>
      </section>

      <section className="features-section">
        <div className="courses-container">
          <div className="text-content">
            <p>
              Whether you're planning next semester or just exploring your interests, we make it easier 
              than ever to find the classes that match your needs. We also take it a step further by 
              offering personalized course recommendations. By learning about your interests, we suggest 
              the classes that best align with your goals and passions, making it easier to plan for both 
              academic success and personal growth.
            </p>
            <Link to="/courses" className="action-button">
              Explore Courses
            </Link>
          </div>
          <div className="image-carousel courses">
            <img src="Graduation Cap.svg" alt="Courses" className="feature-svg"/>
          </div>
        </div>

        <div className="clubs-container">
          <div className="text-content">
            <p>
              High school is more than just classes—it's also about community and 
              finding your place. Whether you're into STEM, drama, art, or something entirely unique, our 
              platform helps you discover opportunities to connect with others and pursue what excites you most.
            </p>
            <Link to="/clubs" className="action-button">
              Discover Clubs
            </Link>
          </div>
          <div className="image-carousel clubs">
            <img src="People Connecting.svg" alt="Clubs" className="feature-svg"/>
          </div>
        </div>
      </section>
      <div className="mobile-warning">
        This website is not mobile-friendly yet. Please tilt your device or use a computer for the best experience.
      </div>
    </div>
  );
}

export default Home;