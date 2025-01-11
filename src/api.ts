const SHEETS_API_URL = import.meta.env.VITE_SHEETS_API_URL;

export interface Club {
  email: string;
  officer: string;
  advisor: string;
  name: string;
  description: string;
  flyer: string;
}

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

export const fetchClubs = async (): Promise<Club[]> => {
  return fetchData<Club>('Clubs');
};

export const fetchCourses = async (): Promise<Course[]> => {
  return fetchData<Course>('Courses');
};

const fetchData = async <T>(sheetName: string): Promise<T[]> => {
  try {
    const response = await fetch(`${SHEETS_API_URL}?sheet=${sheetName}`);
    if (!response.ok) {
      throw new Error('Network response was not okay');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${sheetName} data:`, error);
    return [];
  }
};
