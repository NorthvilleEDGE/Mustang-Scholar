import { useEffect, useState } from 'react';
import { fetchCourses } from '../api';
import '../styles/Courses.css';

interface Course {
  name: string,
  number: string,
  prerequisite: string,
  duration: string,
  description: string,
  department: string,
  type: string,
  ncaa: string,
  mmcvpaa: string,
}

function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');

  useEffect(() => {
    const getCourses = async () => {
      const coursesData = await fetchCourses();
      setCourses(coursesData);
      setLoading(false);
    };
    getCourses();
  }, []);

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const formatValue = (value: string): string => {
    return value === 'N/A' ? 'None' : value;
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
      (course.prerequisite && course.prerequisite.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDepartment = !selectedDepartment || course.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const renderBadges = (course: Course) => (
    <div className="course-badges">
      <span className="badge honors">{course.type}</span>
      {course.ncaa && <span className="badge ncaa">NCAA</span>}
      {course.mmcvpaa && <span className="badge vpaa">VPAA</span>}
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
                        <div className="info-item">
                          <span className="info-label">Duration:</span>
                          <span className="info-value">{highlightText(formatValue(course.duration), searchQuery)}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Prerequisites:</span>
                          <span className="info-value">{highlightText(formatValue(course.prerequisite), searchQuery)}</span>
                        </div>
                      </div>

                      <div className="course-description-text">
                        <h3>Course Description</h3>
                        <p>{highlightText(course.description, searchQuery)}</p>
                      </div>

                      <div className="course-requirements">
                        <h3>Course Designations</h3>
                        <ul>
                          <li>{course.type}</li>
                          {course.ncaa && <li>NCAA Approved Course</li>}
                          {course.mmcvpaa && <li>Qualifies for .50 MMC-VPAA Requirements</li>}
                        </ul>
                      </div>
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