import { useState } from 'react';
import '../styles/Lists.css';
import { useData } from '../context/DataContext';

function Clubs() {
  const { clubs, loading } = useData();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
          <div className="filters-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search clubs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="results-count">
            Found {filteredClubs.length} course{filteredClubs.length !== 1 ? 's' : ''}
          </div>

          <div className="courses-list">
            {filteredClubs.map((club, index) => (
              <div 
                key={index} 
                className={`course-item ${activeIndex === index ? 'active' : ''}`} 
              >
                <div className="course-header" onClick={() => handleToggle(index)}>
                  <div className="course-title">
                    <h2>{highlightText(club.name, searchQuery)}</h2>
                  </div>
                  <span className="dropdown-arrow">
                    {activeIndex === index ? '▲' : '▼'}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="course-description">
                    <div className="course-details">
                      <div className="course-description-text">
                        <h3>Club Description</h3>
                        <p>{highlightText(club.description, searchQuery)}</p>
                      </div>
                      <div className="info-item club">
                        <span className="info-label">Officer:</span>
                        <span className="info-value">{highlightText(club.officer, searchQuery)}</span>
                      </div>
                      <div className="info-item club">
                        <span className="info-label">Officer Email:</span>
                        <a className="info-value" href={`mailto:${club.email}`}>{highlightText(club.email, searchQuery)}</a>
                      </div>
                      <div className="info-item club">
                        <span className="info-label">Advisor:</span>
                        <span className="info-value">{highlightText(club.advisor, searchQuery)}</span>
                      </div>
                    </div>
                    {club.flyer && (
                      <div className="club-flyer">
                        <iframe 
                          src={getDriveViewerUrl(club.flyer)} 
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