import { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import '../styles/Planner.css';

interface CourseOption {
  label: string;
  courses: string[];
}

function Planner() {
  const { courses } = useData();
  const [gradeLevel, setGradeLevel] = useState<string>('');
  const [semester1Selections, setSemester1Selections] = useState<string[]>([]);
  const [semester2Selections, setSemester2Selections] = useState<string[]>([]);
  
  // Filter states
  const [filterNCAA, setFilterNCAA] = useState(false);
  const [filterVPAA, setFilterVPAA] = useState(false);
  const [filterPrerequisites, setFilterPrerequisites] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [filterRegular, setFilterRegular] = useState(false);
  const [filterHonors, setFilterHonors] = useState(false);
  const [filterAP, setFilterAP] = useState(false);
  const [filterIB, setFilterIB] = useState(false);
  
  // Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Get course options based on grade level and filters
  const getCourseOptions = (grade: string): CourseOption[] => {
    const options: CourseOption[] = [];
    
    if (grade === '9') {
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
    } else if (grade === '10') {
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
    return coursesToFilter
      .filter(course => {
        const matchesDepartment = !selectedDepartment || course.department === selectedDepartment;
        const matchesNCAA = !filterNCAA || course.ncaa === "Yes";
        const matchesVPAA = !filterVPAA || course.vpaa === "Yes";
        const matchesPrerequisites = !filterPrerequisites || course.prerequisites.toLowerCase() === "none";

        const classTypeFilters = [
          filterRegular && "Regular",
          filterHonors && "Honors",
          filterAP && "AP",
          filterIB && "IB"
        ].filter(Boolean);

        const matchesClassType = classTypeFilters.length === 0 || classTypeFilters.includes(course.type);

        return matchesDepartment && matchesNCAA && matchesVPAA && matchesPrerequisites && matchesClassType;
      })
      .map(c => c.name);
  };

  // Handle search input
  const handleSearchInput = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filteredCourses = courses.filter(course =>
      course.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredCourses);
    setShowSearchResults(true);
  };

  // Handle course selection from search
  const handleCourseSelect = (selectedCourse: any) => {
    if (!gradeLevel) {
      alert('Please select a grade level first');
      return;
    }

    const courseOptions = getCourseOptions(gradeLevel);
    let placed = false;

    // Check if this is a paired semester course (ends in A or B)
    const isPairedCourse = /[AB]$/.test(selectedCourse.name);
    let pairedCourseName: string | null = null;
    
    if (isPairedCourse) {
      const baseCourseName = selectedCourse.name.slice(0, -1);
      const currentLetter = selectedCourse.name.slice(-1);
      pairedCourseName = `${baseCourseName}${currentLetter === 'A' ? 'B' : 'A'}`;
    }

    // Check if this is a year-long course
    const isYearLong = selectedCourse.duration?.startsWith('Two');

    // Try to place in the appropriate department slot first
    courseOptions.forEach((option, index) => {
      if (option.label === selectedCourse.department && !placed) {
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
              placed = true;
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
              placed = true;
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
            placed = true;
          }
        } else {
          // Handle single-semester courses as before
          if (semester1Selections[index] === '') {
            const newSelections = [...semester1Selections];
            newSelections[index] = selectedCourse.name;
            setSemester1Selections(newSelections);
            placed = true;
          } else if (semester2Selections[index] === '') {
            const newSelections = [...semester2Selections];
            newSelections[index] = selectedCourse.name;
            setSemester2Selections(newSelections);
            placed = true;
          }
        }
      }
    });

    // If not placed and not an alternate, try to place in an empty elective slot
    if (!placed && !courseOptions[courseOptions.length - 1].label.includes('Alternate')) {
      courseOptions.forEach((option, index) => {
        if (option.label === 'Elective' && !placed) {
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
                placed = true;
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
                placed = true;
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
              placed = true;
            }
          } else {
            // Handle single-semester courses as before
            if (semester1Selections[index] === '') {
              const newSelections = [...semester1Selections];
              newSelections[index] = selectedCourse.name;
              setSemester1Selections(newSelections);
              placed = true;
            } else if (semester2Selections[index] === '') {
              const newSelections = [...semester2Selections];
              newSelections[index] = selectedCourse.name;
              setSemester2Selections(newSelections);
              placed = true;
            }
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

  // Reset selections when grade level changes
  useEffect(() => {
    setSemester1Selections(Array(7).fill(''));
    setSemester2Selections(Array(7).fill(''));
  }, [gradeLevel]);

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

  const courseOptions = getCourseOptions(gradeLevel);
  const departments = [...new Set(courses.map(course => course.department))].sort();

  return (
    <div className="main-content">
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

        <div className="filter-group">
          <label htmlFor="department">Department</label>
          <select
            id="department"
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
            {courseOptions.map((option, index) => (
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
        </div>
      </div>
    </div>
  );
}

export default Planner;