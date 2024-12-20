const CLUBS_SHEETY_API_URL = import.meta.env.VITE_CLUBS_SHEETY_API_URL;

export interface Club {
  email: string;
  name: string;
  description: string;
}

export const fetchClubs = async (): Promise<Club[]> => {
  try {
    const response = await fetch(CLUBS_SHEETY_API_URL);
    const json = await response.json();
    return json.clubs;
  } catch (error) {
    console.error('Error fetching clubs data:', error);
    return [];
  }
};
