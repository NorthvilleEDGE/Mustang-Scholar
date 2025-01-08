import { useEffect, useState } from 'react';
import { fetchClubs, Club } from '../api';
import '../styles/Club.css';

function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getClubs = async () => {
      const clubsData = await fetchClubs();
      setClubs(clubsData);
      setLoading(false);
    };
    getClubs();
  }, []);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const getDriveViewerUrl = (url: string) => {
    const fileIdMatch = url.match(/[-\w]{25,}/);
    return fileIdMatch ? `https://drive.google.com/file/d/${fileIdMatch[0]}/preview` : url;
  };

  return (
    <div className="home-container">
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
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
                  <div className="club-details">
                    <p>{club.description}</p>
                    <p>Officer: <span>{club.officer}</span></p>
                    <p>Officer Email: <a href={`mailto:${club.email}`}>{club.email}</a></p>
                    <p>Advisor: <span>{club.advisor}</span></p>
                    <a href={club.flyer}>Link to flyer</a>
                  </div>
                  {club.flyer && (
                    <div className="club-flyer">
                      <iframe 
                        src={getDriveViewerUrl(club.flyer)} 
                        width="100%" 
                        height="600px" 
                        title="Flyer"
                      ></iframe>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Clubs;