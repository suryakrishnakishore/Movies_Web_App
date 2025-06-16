import axios from "axios";

console.log("Backend url: ", import.meta.env.VITE_BACKEND_API_URL);

const API_URL = `${import.meta.env.VITE_BACKEND_API_URL}/api-v1`;

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