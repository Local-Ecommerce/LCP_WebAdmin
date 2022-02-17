import axios from 'axios';
const BASE_URL = //"https://localhost:5001/api/";
//"https://localhost:5001/api/";
"https://localcommercialplatform-api.azurewebsites.net/api/";

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('TOKEN_KEY')}`
    }
});

export const publicRequest = (url) => {
    return BASE_URL + url;
}
