import axios from 'axios';

const CLUBS_SHEETY_API_URL = import.meta.env.CLUBS_SHEETY_API_URL;

async function getTextFromFile() {
    fetch(CLUBS_SHEETY_API_URL)
    .then((response) => response.json())
    .then(json => {
    console.log(json.clubs);
});

}

export { getTextFromFile };
