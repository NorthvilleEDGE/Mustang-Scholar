import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import '../styles/Header.css';

function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="header">
      <Link to="/" className="title">Mustang Scholar</Link>
      <div className="header-buttons">
        <Link to="/courses">Courses</Link>
        <Link to="/clubs">Clubs</Link>
        <Link to="/planner">Planner</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/about">About Us</Link>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
}

export default Header;