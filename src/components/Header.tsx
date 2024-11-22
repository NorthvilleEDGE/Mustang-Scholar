import { Link } from 'react-router-dom';
import '../styles/HeaderStyle.css';

function Header() {
  return (
    <header className="header">
      <h1 className="animated-gradient-text">Mustang Scholar</h1>
      <div className="header-buttons">
        <Link to="/">Home</Link>
        <Link to="/clubs">Clubs</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/recommendations">Recommendations</Link>
      </div>
    </header>
  );
}

export default Header;