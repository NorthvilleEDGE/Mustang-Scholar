import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import '../styles/Lists.css';
import '../styles/Planner.css';

interface CourseOption {
  label: string;
  courses: string[];
}

function Planner() {
  const { courses, loading } = useData();
  const [gradeLevel, setGradeLevel] = useState<string>('');
  const [semester1Selections, setSemester1Selections] = useState<string[]>(Array(9).fill(''));
  const [semester2Selections, setSemester2Selections] = useState<string[]>(Array(9).fill(''));
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const getCourseOptions = (grade: string): CourseOption[] => {
    const options: CourseOption[] = [];

    if (grade === '9') {
      options.push(
        { label: 'English', courses: filterCourses(courses.filter(c => c.department === 'English')) },
        { label: 'Math', courses: filterCourses(courses.filter(c => c.department === 'Math')) },
        { label: 'Science', courses: filterCourses(courses.filter(c => c.department === 'Science')) },
        { label: 'Social Studies', courses: filterCourses(courses.filter(c => c.department === 'Social Studies')) },
        { label: 'World Language', courses: filterCourses(courses.filter(c => c.department === 'World Language')) },
        { label: 'Health/PE', courses: filterCourses(courses.filter(c => c.department === 'Health/PE')) },
        { label: 'Elective', courses: filterCourses(courses) },
        { label: '(Alternate Elective)', courses: filterCourses(courses) },
        { label: '(Alternate Elective)', courses: filterCourses(courses) },
      );
    } else if (grade === '10') {
      options.push(
        { label: 'English', courses: filterCourses(courses.filter(c => c.department === 'English')) },
        { label: 'Math', courses: filterCourses(courses.filter(c => c.department === 'Math')) },
        { label: 'Science', courses: filterCourses(courses.filter(c => c.department === 'Science')) },
        { label: 'Social Studies', courses: filterCourses(courses.filter(c => c.department === 'Social Studies')) },
        { label: 'World Language', courses: filterCourses(courses.filter(c => c.department === 'World Language')) },
        { label: 'Elective', courses: filterCourses(courses) },
        { label: 'Elective', courses: filterCourses(courses) },
        { label: '(Alternate Elective)', courses: filterCourses(courses) },
        { label: '(Alternate Elective)', courses: filterCourses(courses) },
      );
    } else if (grade === '11') {
      options.push(
        { label: 'English', courses: filterCourses(courses.filter(c => c.department === 'English')) },
        { label: 'Math', courses: filterCourses(courses.filter(c => c.department === 'Math')) },
        { label: 'Science', courses: filterCourses(courses.filter(c => c.department === 'Science')) },
        { label: 'Social Studies', courses: filterCourses(courses.filter(c => c.department === 'Social Studies')) },
        { label: 'Elective', courses: filterCourses(courses) },
        { label: 'Elective', courses: filterCourses(courses) },
        { label: 'Elective', courses: filterCourses(courses) },
        { label: '(Alternate Elective)', courses: filterCourses(courses) },
        { label: '(Alternate Elective)', courses: filterCourses(courses) },
      );
    } else if (grade === '12') {
      options.push(
        { label: 'English', courses: filterCourses(courses.filter(c => c.department === 'English')) },
        { label: 'Math', courses: filterCourses(courses.filter(c => c.department === 'Math')) },
        { label: 'Elective', courses: filterCourses(courses) },
        { label: 'Elective', courses: filterCourses(courses) },
        { label: 'Elective', courses: filterCourses(courses) },
        { label: 'Elective', courses: filterCourses(courses) },
        { label: 'Elective', courses: filterCourses(courses) },
        { label: '(Alternate Elective)', courses: filterCourses(courses) },
        { label: '(Alternate Elective)', courses: filterCourses(courses) },
      );
    } else {
      options.push(
        { label: 'Course 1', courses: filterCourses(courses) },
        { label: 'Course 2', courses: filterCourses(courses) },
        { label: 'Course 3', courses: filterCourses(courses) },
        { label: 'Course 4', courses: filterCourses(courses) },
        { label: 'Course 5', courses: filterCourses(courses) },
        { label: 'Course 6', courses: filterCourses(courses) },
        { label: 'Course 7', courses: filterCourses(courses) },
        { label: '(Alternate Elective)', courses: filterCourses(courses) },
        { label: '(Alternate Elective)', courses: filterCourses(courses) },
      );
    }
    return options;
  };

  const filterCourses = (coursesToFilter: any[]) => {
    return coursesToFilter.map(c => c.name);
  };

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    if (value.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filteredCourses = courses.filter(course =>
      course.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResults(filteredCourses);
    setShowSearchResults(true);
  };

  const handleCourseSelect = (selectedCourse: any) => {
    const courseOptions = getCourseOptions(gradeLevel);
    let placed = false;

    // Check if this is a paired semester course (ends in A or B)
    const isPairedCourse = /[AB]$/.test(selectedCourse.name);
    
    // Check if this is a year-long course
    const isYearLong = selectedCourse.duration?.startsWith('Two');

    // First try to place in the matching department slot
    courseOptions.forEach((option, index) => {
      if (!placed && option.label === selectedCourse.department) {
        if (tryPlaceCourse(index, selectedCourse)) {
          placed = true;
        }
      }
    });

    // If not placed, try to place in an elective slot
    if (!placed) {
      courseOptions.forEach((option, index) => {
        if (!placed && (
          option.label === 'Elective' || 
          option.label === '(Alternate Elective)' || 
          option.label.startsWith('Course ')
        )) {
          if (tryPlaceCourse(index, selectedCourse)) {
            placed = true;
          }
        }
      });
    }

    if (!placed) {
      if (isPairedCourse) {
        alert('No available consecutive slots for this paired course. Please clear two consecutive semester slots first.');
      } else if (isYearLong) {
        alert('No available consecutive slots for this year-long course. Please clear two consecutive semester slots first.');
      } else {
        alert('No available slots for this course. Please clear a slot first.');
      }
    }

    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const tryPlaceCourse = (index: number, selectedCourse: any) => {
    const isPairedCourse = /[AB]$/.test(selectedCourse.name);
    let pairedCourseName: string | null = null;
    
    if (isPairedCourse) {
      const baseCourseName = selectedCourse.name.slice(0, -1);
      const currentLetter = selectedCourse.name.slice(-1);
      pairedCourseName = `${baseCourseName}${currentLetter === 'A' ? 'B' : 'A'}`;
    }

    // Check if this is a year-long course
    const isYearLong = selectedCourse.duration?.startsWith('Two');

    if (isPairedCourse) {
      const selectedLetter = selectedCourse.name.slice(-1);
      if (selectedLetter === 'A') {
        // For 'A' courses, try to place in semester 1 with 'B' in semester 2
        if (semester1Selections[index] === '' && semester2Selections[index] === '') {
          const newSem1 = [...semester1Selections];
          const newSem2 = [...semester2Selections];
          newSem1[index] = selectedCourse.name;
          newSem2[index] = pairedCourseName!;
          setSemester1Selections(newSem1);
          setSemester2Selections(newSem2);
          return true;
        }
      } else {
        // For 'B' courses, try to place in semester 2 with 'A' in semester 1
        if (semester1Selections[index] === '' && semester2Selections[index] === '') {
          const newSem1 = [...semester1Selections];
          const newSem2 = [...semester2Selections];
          newSem1[index] = pairedCourseName!;
          newSem2[index] = selectedCourse.name;
          setSemester1Selections(newSem1);
          setSemester2Selections(newSem2);
          return true;
        }
      }
    } else if (isYearLong) {
      // For year-long courses, try to place in both semesters
      if (semester1Selections[index] === '' && semester2Selections[index] === '') {
        const newSem1 = [...semester1Selections];
        const newSem2 = [...semester2Selections];
        newSem1[index] = selectedCourse.name;
        newSem2[index] = selectedCourse.name;
        setSemester1Selections(newSem1);
        setSemester2Selections(newSem2);
        return true;
      }
    } else {
      // Handle single-semester courses
      if (semester1Selections[index] === '') {
        const newSelections = [...semester1Selections];
        newSelections[index] = selectedCourse.name;
        setSemester1Selections(newSelections);
        return true;
      } else if (semester2Selections[index] === '') {
        const newSelections = [...semester2Selections];
        newSelections[index] = selectedCourse.name;
        setSemester2Selections(newSelections);
        return true;
      }
    }
    return false;
  };

  const handleSemester1Change = (index: number, value: string) => {
    const newSelections = [...semester1Selections];
    newSelections[index] = value;
    setSemester1Selections(newSelections);
  };

  const handleSemester2Change = (index: number, value: string) => {
    const newSelections = [...semester2Selections];
    newSelections[index] = value;
    setSemester2Selections(newSelections);
  };

  const handleClear = () => {
    setSemester1Selections(Array(9).fill(''));
    setSemester2Selections(Array(9).fill(''));
    setGradeLevel('');
  };

  const handlePrint = () => {
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    // Generate the HTML content
    const content = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Course Selections</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 {
              text-align: center;
              margin-bottom: 30px;
            }
            .course-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 30px;
            }
            .course-table th,
            .course-table td {
              border: 1px solid #ccc;
              padding: 10px;
              text-align: left;
            }
            .course-table th {
              background-color: #f5f5f5;
            }
            .grade-level {
              margin-bottom: 20px;
              font-size: 1.2em;
            }
          </style>
        </head>
        <body>
          <h1>Course Selections</h1>
          ${gradeLevel ? `<div class="grade-level">Grade Level: ${gradeLevel}th Grade</div>` : ''}
          <table class="course-table">
            <thead>
              <tr>
                <th>Course Type</th>
                <th>Semester 1</th>
                <th>Semester 2</th>
              </tr>
            </thead>
            <tbody>
              ${getCourseOptions(gradeLevel).map((option, index) => `
                <tr>
                  <td>${option.label}</td>
                  <td>${semester1Selections[index] || '-'}</td>
                  <td>${semester2Selections[index] || '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;

    // Write the content to the new window and print
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.print();
  };

  useEffect(() => {
    setSemester1Selections(Array(9).fill(''));
    setSemester2Selections(Array(9).fill(''));
  }, [gradeLevel]);

  return (
    <div className="main-content">
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <>
          <div className="sidebar">
            <div className="filter-group">
              <label htmlFor="search">Search Courses</label>
              <input
                type="text"
                id="search"
                className="search-input"
                placeholder="Search for a course..."
                value={searchQuery}
                onChange={(e) => handleSearchInput(e.target.value)}
              />
              {showSearchResults && searchResults.length > 0 && (
                <div className="search-results">
                  {searchResults.map((course, index) => (
                    <div
                      key={index}
                      className="search-result-item"
                      onClick={() => handleCourseSelect(course)}
                    >
                      {course.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="planner-container">
            <div className="planner-form">
              <select 
                className="grade-select"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value)}
              >
                <option value="">Select a grade for a grade-specific class template</option>
                <option value="9">9th Grade</option>
                <option value="10">10th Grade</option>
                <option value="11">11th Grade</option>
                <option value="12">12th Grade</option>
              </select>

              <div className="course-table">
                <div className="semester-headers">
                  <div className="label-column"></div>
                  <h2>Semester 1</h2>
                  <h2>Semester 2</h2>
                </div>
                {getCourseOptions(gradeLevel).map((option, index) => (
                  <div key={`row-${index}`} className="course-row">
                    <div className="label-column">
                      <label>{option.label}</label>
                    </div>
                    <div className="semester-column">
                      <select
                        value={semester1Selections[index]}
                        onChange={(e) => handleSemester1Change(index, e.target.value)}
                      >
                        <option value="">Select a course</option>
                        {option.courses.map((course, i) => (
                          <option key={i} value={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                    <div className="semester-column">
                      <select
                        value={semester2Selections[index]}
                        onChange={(e) => handleSemester2Change(index, e.target.value)}
                      >
                        <option value="">Select a course</option>
                        {option.courses.map((course, i) => (
                          <option key={i} value={course}>{course}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
              <div className="button-container">
                <button className="clear-button" onClick={handleClear}>
                  Clear All
                </button>
                <button className="print-button" onClick={handlePrint}>
                  Print Schedule
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Planner;