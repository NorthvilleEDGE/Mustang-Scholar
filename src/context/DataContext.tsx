import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchClubs, fetchCourses, Club, Course } from '../api';

interface DataContextProps {
  courses: Course[];
  clubs: Club[];
  loading: boolean;
}

const DataContext = createContext<DataContextProps | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [coursesData, clubsData] = await Promise.all([fetchCourses(), fetchClubs()]);
      setCourses(coursesData);
      setClubs(clubsData);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ courses, clubs, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
