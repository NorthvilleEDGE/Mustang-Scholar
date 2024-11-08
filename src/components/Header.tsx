import { useNavigate } from 'react-router-dom';
import '../styles/HeaderStyle.css';

function Header() {
  const navigate = useNavigate();

  return (
    <header className="header">
      <h1>Mustang Scholar</h1>
      <div className="header-buttons">
        <button onClick={() => navigate('/')}>Home</button>
        <button onClick={() => navigate('/clubs')}>Clubs</button>
        <button onClick={() => navigate('/courses')}>Courses</button>
        <button onClick={() => navigate('/recommendations')}>Recommendations</button>
      </div>
    </header>
  );
}

export default Header;