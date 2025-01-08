import { useEffect, useState } from 'react';
import { fetchClubs, Club } from '../api';
import '../styles/Club.css';

function Clubs() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

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

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <mark key={index} className="highlight">{part}</mark>
      ) : (
        part
      )
    );
  };

  const filteredClubs = clubs.filter(club =>
    club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.officer.toLowerCase().includes(searchQuery.toLowerCase()) ||
    club.advisor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <>
          <input
            type="text"
            className="search-input"
            placeholder="Search clubs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="clubs-list">
            {filteredClubs.map((club, index) => (
              <div 
                key={index} 
                className={`club-item ${activeIndex === index ? 'active' : ''}`} 
              >
                <div className="club-header">
                  <h2>{highlightText(club.name, searchQuery)}</h2>
                  <span
                    className="dropdown-arrow"
                    onClick={() => handleToggle(index)}
                  >{activeIndex === index ? '▲' : '▼'}</span>
                </div>
                {activeIndex === index && (
                  <div className="club-description">
                    <div className="club-details">
                      <p>{highlightText(club.description, searchQuery)}</p>
                      <p>Officer: <span>{highlightText(club.officer, searchQuery)}</span></p>
                      <p>Officer Email: <a href={`mailto:${club.email}`}>{highlightText(club.email, searchQuery)}</a></p>
                      <p>Advisor: <span>{highlightText(club.advisor, searchQuery)}</span></p>
                      {club.flyer && (
                          <a href={club.flyer} target="_blank" rel="noopener noreferrer">View Flyer</a>
                      )}
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
        </>
      )}
    </div>
  );
}

export default Clubs;