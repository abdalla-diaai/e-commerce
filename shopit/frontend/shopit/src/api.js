import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access');
        if (token) {
            const decoded = jwtDecode(token);
            const expiry_time = decoded.exp;
            const current_time = Date.now() / 1000;
            if (expiry_time < current_time) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
