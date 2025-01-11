import { useState } from 'react';
import '../styles/Lists.css';
import { useData } from '../context/DataContext';

export interface Course {
  name: string,
  type: string,
  number: string,
  department: string,
  ncaa: string,
  vpaa: string,
  prerequisites: string,
  duration: string,
  description: string,
  recommend: string,
  notes: string,
  pe: string,
  health: string,
  video: string,
}

function Courses() {
  const { courses, loading } = useData();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const departments = [...new Set(courses.map(course => course.department))].sort();

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

  const filteredCourses = courses.filter(course => {
    const matchesSearch = 
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (course.prerequisites && course.prerequisites.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDepartment = !selectedDepartment || course.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const renderBadges = (course: Course) => (
    <div className="course-badges">
      {course.type !== "Regular" && <span className={`badge ${course.type.toLowerCase()}`}>{course.type}</span>}
      {course.ncaa === "Yes" && <span className="badge ncaa">NCAA</span>}
      {course.vpaa ==="Yes" && <span className="badge vpaa">VPAA</span>}
      {course.pe === "Yes" && <span className="badge pe">PE</span>}
      {course.health === "Yes" && <span className="badge health">Health</span>}
    </div>
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
              placeholder="Search courses by name, number, description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select
              className="department-select"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>

          <div className="results-count">
            Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
          </div>

          <div className="courses-list">
            {filteredCourses.map((course, index) => (
              <div 
                key={index} 
                className={`course-item ${activeIndex === index ? 'active' : ''}`} 
              >
                <div className="course-header" onClick={() => handleToggle(index)}>
                  <div className="course-title">
                    <h2>{highlightText(course.name, searchQuery)}</h2>
                    <span className="course-number">
                      {course.number !== 'N/A' && highlightText(course.number, searchQuery)}
                    </span>
                  </div>
                  {renderBadges(course)}
                  <span className="dropdown-arrow">
                    {activeIndex === index ? '▲' : '▼'}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="course-description">
                    <div className="course-details">
                      <div className="course-info-grid">
                        <div className="info-item">
                          <span className="info-label">Department:</span>
                          <span className="info-value">{highlightText(course.department, searchQuery)}</span>
                        </div>
                        {course.duration && (
                          <div className="info-item">
                            <span className="info-label">Duration:</span>
                            <span className="info-value">{highlightText(course.duration, searchQuery)}</span>
                          </div>
                        )}
                        <div className="info-item">
                          <span className="info-label">Prerequisites:</span>
                          <span className="info-value">{highlightText(course.prerequisites, searchQuery)}</span>
                        </div>
                        {course.video && (
                          <div className="info-item">
                            <button onClick={() => window.open(course.video, '_blank', 'noopener,noreferrer')} className="video-button">Watch Video</button>
                          </div>
                        )}
                      </div>
                      <div className="course-description-text">
                        <h3>Course Description</h3>
                        <p>{highlightText(course.description, searchQuery)}</p>
                        {course.notes && <p>{highlightText(course.notes, searchQuery)}</p>}
                      </div>
                      {(course.type !== "Regular" || course.ncaa === "Yes" || course.vpaa === "Yes" || course.pe === "Yes" || course.health === "Yes") && (
                        <div className="course-requirements">
                          <h3>Course Designations</h3>
                          <ul>
                            {course.type !== "Regular" && <li>{course.type}</li>}
                            {course.ncaa === "Yes" && <li>NCAA Approved Course</li>}
                            {course.vpaa === "Yes" && <li>Qualifies for .50 MMC-VPAA Requirements</li>}
                            {course.pe === "Yes" && <li>Qualifies for .50 MMC-Physical Education Requirement</li>}
                            {course.health === "Yes" && <li>Meets .50 MMC/Health Requirement</li>}
                          </ul>
                        </div>
                      )}
                    </div>
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

export default Courses;