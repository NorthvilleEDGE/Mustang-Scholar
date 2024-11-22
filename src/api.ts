import axios from 'axios';

const SHEETY_API_URL = process.env.SHEETY_API_URL;

async function getFirstRow() {
    try {
        const response = await axios.get(`${SHEETY_API_URL}/sheet1`);
        const rows = response.data.sheet1;
        if (rows.length > 0) {
            console.log('First row:', rows[0]);
            return rows[0];
        } else {
            console.log('No data found.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

getFirstRow();