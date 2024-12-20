import { useEffect, useState } from 'react';
import '../styles/ClubStyle.css';

const CLUBS_SHEETY_API_URL = import.meta.env.VITE_CLUBS_SHEETY_API_URL;

interface Club {
    email: string;
    name: string;
    description: string;
}

function Clubs() {
    const [clubs, setClubs] = useState<Club[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

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

    const handleToggle = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="home-container">
            <h1 className="homeHeader">Clubs</h1>
            <div className="clubs-list">
                {clubs.map((club, index) => (
                    <div 
                        key={index} 
                        className={`club-item ${activeIndex === index ? 'active' : ''}`} 
                        onClick={() => handleToggle(index)}
                    >
                        <div className="club-header">
                            <h2>{club.name}</h2>
                            <span className="dropdown-arrow">{activeIndex === index ? '▲' : '▼'}</span>
                        </div>
                        {activeIndex === index && (
                            <div className="club-description">
                                <p>{club.description}</p>
                                <p>Contact: {club.email}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Clubs;