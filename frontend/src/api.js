import axios from 'axios';

const API = axios.create({
    // Use the Render URL if it exists, otherwise use localhost
    baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5001/api"
});

export default API;