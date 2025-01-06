import { useEffect, useState } from 'react';
import { fetchClubs, Club } from '../api';
import '../styles/Club.css';

function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    const getClubs = async () => {
      const clubsData = await fetchClubs();
      setClubs(clubsData);
    };
    getClubs();
  }, []);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="home-container">
      <div className="clubs-list">
        {clubs.map((club, index) => (
          <div 
            key={index} 
            className={`club-item ${activeIndex === index ? 'active' : ''}`} 
          >
            <div className="club-header">
              <h2>{club.name}</h2>
              <span
                className="dropdown-arrow"
                onClick={() => handleToggle(index)}
              >{activeIndex === index ? '▲' : '▼'}</span>
            </div>
            {activeIndex === index && (
              <div className="club-description">
                <p>{club.description}</p>
                <p>Contact: <a href={`mailto:${club.email}`}>{club.email}</a></p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Clubs;