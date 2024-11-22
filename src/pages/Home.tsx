import { Link } from 'react-router-dom';
import '../styles/HomeStyle.css';

function Home() {
  return (
    <div>
      <div className="homeHeader">
        <h1>INTRODUCING <span className="gradientText">MUSTANG SCHOLAR</span></h1>
        <h2>All of your course planning needs in one place</h2>
      </div>
      <div className="homeBody">
          <p>High school can be overwhelming, especially when navigating long, complicated <Link to="/courses">course</Link> catalogs and trying to make sense of all the available options. That’s where we come in. Our website streamlines the process by organizing <Link to="/courses">course</Link> information into a simple, user-friendly format. Whether you're planning next semester or just exploring your interests, we make it easier than ever to find the classes that match your needs. We also take it a step further by offering personalized <Link to="/courses">course</Link> recommendations. By learning about your interests, we suggest the classes that best align with your goals and passions, making it easier to plan for both academic success and personal growth.</p>
          <p>But that’s not all. High school is more than just classes—it’s also about community and finding your place. That’s why we’ve compiled a comprehensive list of all the <Link to="/clubs">clubs</Link> and extracurricular activities available at your school. Whether you’re into STEM, drama, sports, or something entirely unique, our platform helps you discover opportunities to connect with others and pursue what excites you most. Created by Brody Holm, Pedro Candido de Sousa, and Matthew McClure, this website is built with students in mind, giving you the tools to explore, organize, and thrive in your high school journey.</p>
          <div className="homeFooter">
            <p> Click <Link to="/recommendations">here</Link> to personalize your experience!</p>
            </div>
      </div>
    </div>
  );
}

export default Home;