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
  const [sortOption, setSortOption] = useState<string>('number');
  const [filterNCAA, setFilterNCAA] = useState(false);
  const [filterVPAA, setFilterVPAA] = useState(false);
  const [filterPrerequisites, setFilterPrerequisites] = useState(false);
  const [filterDuration, setFilterDuration] = useState('');
  const [filterVideo, setFilterVideo] = useState(false);
  const [filterRegular, setFilterRegular] = useState(false);
  const [filterHonors, setFilterHonors] = useState(false);
  const [filterAP, setFilterAP] = useState(false);
  const [filterIB, setFilterIB] = useState(false);

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
    const matchesNCAA = !filterNCAA || course.ncaa === "Yes";
    const matchesVPAA = !filterVPAA || course.vpaa === "Yes";
    const matchesPrerequisites = !filterPrerequisites || course.prerequisites.toLowerCase() === "none";
    const matchesDuration = !filterDuration || course.duration.startsWith(filterDuration);
    const matchesVideo = !filterVideo || course.video;

    const classTypeFilters = [
      filterRegular && "Regular",
      filterHonors && "Honors",
      filterAP && "AP",
      filterIB && "IB"
    ].filter(Boolean);

    const matchesClassType = classTypeFilters.length === 0 || classTypeFilters.includes(course.type);

    return matchesSearch && matchesDepartment && matchesNCAA && matchesVPAA && matchesPrerequisites && matchesDuration && matchesVideo && matchesClassType;
  });

  const handleSort = (courses: Course[]) => {
    switch (sortOption) {
      case 'name':
        return [...courses].sort((a, b) => a.name.localeCompare(b.name));
      case 'number':
        return [...courses].sort((a, b) => a.number.localeCompare(b.number));
      case 'type':
        return [...courses].sort((a, b) => a.type.localeCompare(b.type));
      default:
        return courses;
    }
  };

  const sortedCourses = handleSort(filteredCourses);

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
    <div className="main-content">
      <div className="sidebar">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            className="search-input"
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="department">Department</label>
          <select
            id="department"
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
        <div className="filter-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filterNCAA}
              onChange={(e) => setFilterNCAA(e.target.checked)}
            />
            NCAA
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filterVPAA}
              onChange={(e) => setFilterVPAA(e.target.checked)}
            />
            VPAA
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filterPrerequisites}
              onChange={(e) => setFilterPrerequisites(e.target.checked)}
            />
            No Prerequisites
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filterVideo}
              onChange={(e) => setFilterVideo(e.target.checked)}
            />
            Video Available
          </label>
        </div>
        <div className="filter-group">
          <h4>Class Type</h4>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filterRegular}
              onChange={(e) => setFilterRegular(e.target.checked)}
            />
            Regular
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filterHonors}
              onChange={(e) => setFilterHonors(e.target.checked)}
            />
            Honors
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filterAP}
              onChange={(e) => setFilterAP(e.target.checked)}
            />
            AP
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={filterIB}
              onChange={(e) => setFilterIB(e.target.checked)}
            />
            IB
          </label>
        </div>
        <div className="filter-group">
          <label htmlFor="duration">Duration</label>
          <select
            id="duration"
            className="department-select"
            value={filterDuration}
            onChange={(e) => setFilterDuration(e.target.value)}
          >
            <option value="">All</option>
            <option value="One">1 Semester</option>
            <option value="Two">2 Semesters</option>
          </select>
        </div>
        <h3>Sort By</h3>
        <div className="sort-group">
          <select
            id="sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="number">Department</option>
            <option value="type">Type</option>
          </select>
        </div>
      </div>
      <div className="home-container">
        {loading ? (
          <div className="loading-spinner"></div>
        ) : (
          <>
            <div className="results-count">
              Found {sortedCourses.length} course{sortedCourses.length !== 1 ? 's' : ''}
            </div>
            <div className="courses-list">
              {sortedCourses.map((course, index) => (
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
    </div>
  );

  
}

export default Courses;