import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <Link to="/" className="title">Mustang Scholar</Link>
      <div className="header-buttons">
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/clubs">Clubs</Link>
        <Link to="/planner">Planner</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/about">About Us</Link>
      </div>
    </header>
  );
}

export default Header;