import { Link } from 'react-router-dom';
import '../styles/HomeStyle.css';

function Home() {
  return (
    <div className="home-container">
      <div className="homeHeader">
        <h1>INTRODUCING <span className="gradientText">MUSTANG SCHOLAR</span></h1>
        <h2>Personalized course and club recommendations to help you thrive</h2>
      </div>

      <section className="description-section">
        <div className="content-box">
          <p>
            High school can be overwhelming, especially when navigating long, complicated course catalogs 
            and trying to make sense of all the available options. That's where we come in. Our website 
            streamlines the process by organizing course information into a simple, user-friendly format.
          </p>
          <div className="button-container">
            <Link to="/courses" className="action-button">
              Get Started
            </Link>
          </div>
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
            <svg className="feature-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="courseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'var(--orange)' }} />
                  <stop offset="100%" style={{ stopColor: 'var(--light-orange)' }} />
                </linearGradient>
              </defs>
              {/* Graduation Cap */}
              <path 
                fill="url(#courseGradient)"
                d="M100 20L20 70l80 50 80-50L100 20zM40 85v40l60 35 60-35V85l-60 35-60-35z"
              />
              {/* Book */}
              <path 
                fill="url(#courseGradient)"
                d="M60 140h80c5.5 0 10-4.5 10-10V70c0-5.5-4.5-10-10-10H60c-5.5 0-10 4.5-10 10v60c0 5.5 4.5 10 10 10z"
                opacity="0.7"
              />
            </svg>
          </div>
        </div>

        <div className="clubs-container">
          <div className="text-content">
            <p>
              But that's not all. High school is more than just classes—it's also about community and 
              finding your place. That's why we've compiled a comprehensive list of all the clubs available 
              at your school. Whether you're into STEM, drama, art, or something entirely unique, our 
              platform helps you discover opportunities to connect with others and pursue what excites you most.
            </p>
            <Link to="/clubs" className="action-button">
              Discover Clubs
            </Link>
          </div>
          <div className="image-carousel clubs">
            <svg className="feature-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="clubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'var(--orange)' }} />
                  <stop offset="100%" style={{ stopColor: 'var(--light-orange)' }} />
                </linearGradient>
              </defs>
              {/* Group of People */}
              <circle cx="100" cy="70" r="20" fill="url(#clubGradient)" />
              <circle cx="60" cy="100" r="20" fill="url(#clubGradient)" opacity="0.8" />
              <circle cx="140" cy="100" r="20" fill="url(#clubGradient)" opacity="0.8" />
              {/* Connection Lines */}
              <path 
                d="M80 70L120 70M60 100L140 100" 
                stroke="url(#clubGradient)" 
                strokeWidth="4"
                opacity="0.6"
              />
              {/* Activity Icons */}
              <rect x="70" y="130" width="60" height="30" rx="15" fill="url(#clubGradient)" opacity="0.7" />
            </svg>
          </div>
        </div>
      </section>

      <section className="creators-section">
        <div className="content-box">
          <p>
            Created by Brody Holm, Pedro Candido de Sousa, and Matthew McClure, this website is built 
            with students in mind, giving you the tools to explore, organize, and thrive in your high 
            school journey.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;