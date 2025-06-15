import axios from "axios";
import env from "dotenv";

env.config();

const API_URL = process.env.BACKEND_API_URL;

const api = axios.create({
    baseURL: API_URL,
});

export function setAuthToken(token) {
    if(token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } 
    else {
        delete api.defaults.headers.common["Authorization"];
    }
}

export default api;