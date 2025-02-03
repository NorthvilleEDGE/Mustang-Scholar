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

  // Get course options based on grade level
  const getCourseOptions = (grade: string): CourseOption[] => {
    const options: CourseOption[] = [];
    
    if (grade === '9') {
      options.push(
        { label: 'English', courses: courses.filter(c => c.department === 'English').map(c => c.name) },
        { label: 'Math', courses: courses.filter(c => c.department === 'Math').map(c => c.name) },
        { label: 'Science', courses: courses.filter(c => c.department === 'Science').map(c => c.name) },
        { label: 'History', courses: courses.filter(c => c.department === 'History').map(c => c.name) },
        { label: 'Language', courses: courses.filter(c => c.department === 'Language').map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math', 'Science', 'History', 'Language'].includes(c.department)).map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math', 'Science', 'History', 'Language'].includes(c.department)).map(c => c.name) }
      );
    } else if (grade === '10') {
      options.push(
        { label: 'English', courses: courses.filter(c => c.department === 'English').map(c => c.name) },
        { label: 'Math', courses: courses.filter(c => c.department === 'Math').map(c => c.name) },
        { label: 'Science', courses: courses.filter(c => c.department === 'Science').map(c => c.name) },
        { label: 'History', courses: courses.filter(c => c.department === 'History').map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math', 'Science', 'History'].includes(c.department)).map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math', 'Science', 'History'].includes(c.department)).map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math', 'Science', 'History'].includes(c.department)).map(c => c.name) }
      );
    } else if (grade === '11') {
      options.push(
        { label: 'English', courses: courses.filter(c => c.department === 'English').map(c => c.name) },
        { label: 'Math', courses: courses.filter(c => c.department === 'Math').map(c => c.name) },
        { label: 'Science', courses: courses.filter(c => c.department === 'Science').map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math', 'Science'].includes(c.department)).map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math', 'Science'].includes(c.department)).map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math', 'Science'].includes(c.department)).map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math', 'Science'].includes(c.department)).map(c => c.name) }
      );
    } else if (grade === '12') {
      options.push(
        { label: 'English', courses: courses.filter(c => c.department === 'English').map(c => c.name) },
        { label: 'Math', courses: courses.filter(c => c.department === 'Math').map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math'].includes(c.department)).map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math'].includes(c.department)).map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math'].includes(c.department)).map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math'].includes(c.department)).map(c => c.name) },
        { label: 'Elective', courses: courses.filter(c => !['English', 'Math'].includes(c.department)).map(c => c.name) }
      );
    }

    return options;
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

  return (
    <div className="planner-container">
      <div className="planner-header">
        <h1>Course Planner</h1>
        <p>Plan your courses for the upcoming school year</p>
      </div>

      <div className="planner-form">
        <select 
          className="grade-select"
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
        >
          <option value="">Select your grade level</option>
          <option value="9">9th Grade</option>
          <option value="10">10th Grade</option>
          <option value="11">11th Grade</option>
          <option value="12">12th Grade</option>
        </select>

        {gradeLevel && (
          <div className="semester-grid">
            <div className="semester">
              <h2>Semester 1</h2>
              {courseOptions.map((option, index) => (
                <div key={`sem1-${index}`} className="course-select">
                  <label>{option.label}</label>
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
              ))}
            </div>

            <div className="semester">
              <h2>Semester 2</h2>
              {courseOptions.map((option, index) => (
                <div key={`sem2-${index}`} className="course-select">
                  <label>{option.label}</label>
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
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Planner;