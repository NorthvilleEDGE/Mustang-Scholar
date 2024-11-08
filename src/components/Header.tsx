import { useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate();

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
  };

  return (
    <header style={{ textAlign: 'center' }}>
      <h1>Northville High School Course Planner</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <button style={buttonStyle} onClick={() => navigate('/')}>Home</button>
        <button style={buttonStyle} onClick={() => navigate('/clubs')}>Clubs</button>
        <button style={buttonStyle} onClick={() => navigate('/courses')}>Courses</button>
        <button style={buttonStyle} onClick={() => navigate('/recommendations')}>Recommendations</button>
      </div>
    </header>
  );
}

export default Header;