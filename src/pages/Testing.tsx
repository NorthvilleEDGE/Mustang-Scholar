import { useEffect, useState } from 'react';

const CLUBS_SHEETY_API_URL = import.meta.env.VITE_CLUBS_SHEETY_API_URL;

interface Club {
    name: string;
    description: string;
}

function Testing() {
    const [clubs, setClubs] = useState<Club[]>([]);

    useEffect(() => {
        fetch(CLUBS_SHEETY_API_URL)
        .then((response) => response.json())
        .then(json => {
            setClubs(json.clubs);
            console.log(json);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <div>
            <h1>Clubs</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {clubs.map((club, index) => (
                        <tr key={index}>
                            <td>{club.name}</td>
                            <td>{club.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Testing;