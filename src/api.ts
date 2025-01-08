const SHEETS_API_URL = import.meta.env.VITE_SHEETS_API_URL;

export interface Club {
  email: string;
  officer: string;
  advisor: string;
  name: string;
  description: string;
  flyer: string;
}

export const fetchClubs = async (): Promise<Club[]> => {
  try {
    const response = await fetch(SHEETS_API_URL);
    if (!response.ok) {
      throw new Error('Network response was not okay');
    }
    const clubs = await response.json();
    return clubs;
  } catch (error) {
    console.error('Error fetching clubs data:', error);
    return [];
  }
};
